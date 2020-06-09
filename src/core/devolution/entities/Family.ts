import { ValueObject } from '../../../shared/domain/value-objects'
import { Member, Ordres, Degrees, MemberConstructor } from '.'

interface FamilyProps {
    value: {
        members: Member[],
        heirs: Member[],
        deCujus: Member
    }
}

export class Family extends ValueObject<FamilyProps> {

    public static create(members: MemberConstructor[]): Family {
        if (members === undefined || members === null) {
            throw new Error()
        } else {
            return new Family(
                {
                    value: {
                        members: members.map(member => Member.create(member)),
                        heirs: [],
                        deCujus: members.map(member => Member.create(member))
                            .find(member => member.attributes.ordre === 0)! //TODO Better error handling
                    }
                })
        }
    }

    get members(): Member[] {
        return this.props.value.members;
    }

    set value(upattributestedMembers: Member[]) {
        Family.create(upattributestedMembers)
    }

    findMember(heir: string) {
        return this.members.find(member => member.member_id === heir)! //TODO fault tolerance
    }

    findSpouseOf(knownSpouseName: string) {
        return this.members.find(member => member.attributes.spouse === knownSpouseName)! //TODO fault tolerance
    }

    /**
    * Members in the most favored class inherit to exclusion of other classes.
    */
    getMostFavoredMembersByOrdre(): Family {
        return Ordres
            .create(this)
            .getFirstAppliableOrdre()
    }

    /**
     * The nearest relation in a class, determined by counting degrees,
     * inherit to the exclusion of more distant relatives in that class.
     * @param filteredMembers members in the most favored class
     */
    getMostFavoredMembersByDegre(mostFavoredOrder: Family): Family {
        return Degrees
            .create(this)
            .getFirstAppliableDegree(mostFavoredOrder, this)
    }

    debug() {
        this.members.map(member => console.log({ id: member.member_id, attributes: member.attributes }))
    }

    /**
     * If a descendant or a sibling predeceases the de cujus, his share goes to his descendants
     * by representation — for example, if a father leaves property to his daughter, and at his 
     * death the daughter has already died, leaving two grandchildren, the grandchildren would 
     * take their mother’s share.
     * @param members Family structure under examination
     **/
    assignRepresentation(): Family {

        //sequence matter
        this.members.forEach(member =>
            member.isReprésenté = member.isReprésentableIn(this))
            this.members.forEach(member =>
            member.isReprésentant = member.isRepresentativeIn(this))

        return this
    }

}