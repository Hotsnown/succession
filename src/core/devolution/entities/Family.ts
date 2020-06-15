import { ValueObject } from '../../../shared/domain/value-objects'
import { Member, MemberConstructor } from '.'
import * as R from 'ramda'

interface FamilyProps {
    value: {
        members: Member[],
        deCujus: Member
    }
}

/**
 * An Immutable Dataclass holding the state of all members
 */
export class Family extends ValueObject<FamilyProps> {

    public static create(members: MemberConstructor[]): Family {
        if (R.isNil(members)) console.error('Validation Error : Family members can not be Nil.')
        if (haveDuplicates(members)) console.error('Invariant Error : Duplicates found.') //members.map(member => member.member_id))
        if (sumOfLegalRightsExceedOneHundredPercent(members)) console.error('Invariant Error : Sum of legal rights exceeds 100%.', members.map(member => ({ id: member.member_id, legalRights: member.attributes.legalRights })))
        if (moreThanOneDeCujus(members)) console.error('Invariant Error : More than one de cujus found.', members.filter(member => isDecujus(member)))
        
        return new Family(
            {
                value: {
                    members: members.map(member => Member.create(member)),
                    deCujus: members.map(member => Member.create(member))
                        .find(isDecujus)! //TODO Better error handling
                }
            })
    }

    get members(): Member[] {
        return this.props.value.members;
    }

    public findMember(querriedMember: string) {
        return this.members.find(member => member.member_id === querriedMember)! //TODO fault tolerance
    }

    public findSpouseOf(knownSpouseName: string) {
        return this.members.find(member => member.attributes.spouse === knownSpouseName)! //TODO fault tolerance
    }

    public findParentsOf = (childName: string): Parents => {
        const result = this.members.filter(member => member.props.value.childs.includes(childName))
        return [result[0], result[1]]
    }

    public copyWith(members: Member[]): Family {
        return Family.create(members);
    }

    public debug(): Family {
        this.members.map(member => console.log({ id: member.member_id, attributes: member.attributes }))
        return this
    }
}

type Parents = [Member, Member]

function haveDuplicates(members: MemberConstructor[]): boolean {
    return R.uniq(members).length !== members.length
}

function sumOfLegalRightsExceedOneHundredPercent(members: MemberConstructor[]): boolean {
    return members.every(
        member => member.attributes.legalRights !== 'unassigned') &&
        members.map(member => member.attributes.legalRights)
            .reduce((a, b) => (a as number) + (b as number))! > 1
}

function isDecujus<T extends MemberConstructor>(member: T): boolean {
    return member.attributes.ordre === 0 && member.attributes.degre === 0
}

function moreThanOneDeCujus(members: MemberConstructor[]): boolean {
    return members.filter(member => isDecujus(member)).length > 1
}