import { ValueObject } from '../../../shared/domain/value-objects'
import { Member, Ordres, Degrees } from '.'

interface FamilyProps {
    value: {
        members: Member[],
        heirs: Member[],
        deCujus: Member
        }
}

export class Family extends ValueObject<FamilyProps> {

    public static create (members: Member[]): Family {
        if (members === undefined || members === null) {
            throw new Error()
        } else {
            return new Family (
                {
                    value: {
                        members: members,
                        heirs: [],
                        deCujus: members.find(member => member.attributes.ordre === 0)! //TODO Better error handling
                    }
                })
        }
    }

    get members (): Member[] {
        return this.props.value.members;
    }

    set value (upattributestedMembers: Member[]) {
        Object.assign(this.props.value, [...upattributestedMembers].map(member => Member.create(member.props.value)))
    }

    findMember (heir: string) {
        return this.members.find(member => member.member_id === heir)! //TODO fault tolerance
    }

    findSpouseOf (knownSpouseName: string) {
        return this.members.find(member => member.attributes.spouse === knownSpouseName)! //TODO fault tolerance
    }

     /**
     * Members in the most favored class inherit to exclusion of other classes.
     */
    getMostFavoredMembersByOrdre (): Family {
        return Ordres
            .create(this)
            .getFirstAppliableOrdre()
    }

    /**
     * The nearest relation in a class, determined by counting degrees,
     * inherit to the exclusion of more distant relatives in that class.
     * @param filteredMembers members in the most favored class
     */
    getMostFavoredMembersByDegre (mostFavoredOrder: Family): Family {
        return Degrees
            .create(this)
            .getFirstAppliableDegree(mostFavoredOrder, this)
    }

    /* 
    drawFamily(){} //Ascii art for debugging
    */

}