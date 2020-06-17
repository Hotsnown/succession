import { ValueObject } from '../../../shared/domain/value-objects'
import { Member, MemberConstructor } from '.'
import * as R from 'ramda'
import { Status } from './Member'

interface FamilyProps {
    value: {
        members: Member[],
        deCujus: Member | undefined
    }
}

//TODO refactor with immer.js

/**
 * An Immutable Dataclass holding the state of all members
 */
export class Family extends ValueObject<FamilyProps> {

    public static create(members: MemberConstructor[]): Family {
        if (R.isNil(members)) console.error('Validation Error : Family members can not be Nil.')
        if (members.some(member => member === undefined)) console.error('Validation Error : Family members can not be Nil.')
        if (haveDuplicates(members)) console.error('Invariant Error : Duplicates found.') //members.map(member => member.member_id))
        if (sumOfLegalRightsExceedOneHundredPercent(members)) console.error('Invariant Error : Sum of legal rights exceeds 100%.', members.map(member => ({ id: member.member_id, legalRights: member.attributes.legalRights })))
        if (moreThanOneDeCujus(members)) console.error('Invariant Error : More than one de cujus found.', members.filter(member => isDecujus(member)).map(deCujus => ({id: deCujus.member_id, attributes: deCujus.attributes})))
        if (invalidHeir(members)) console.error('Invariant Error : ineligible to inherit member has inheritance share.', members.filter(member => memberHasLegalRights(member) && MemberIsInvalid(member))
                                                                                                                         .map(member => ({id: member.member_id, status: member.attributes.status, legalRights: member.attributes.legalRights})))
        
        return new Family(
            {
                value: {
                    members: members.map(member => Member.create(member)),
                    deCujus: members.map(member => Member.create(member))
                        .find(isDecujus) //TODO Better error handling
                }
            })
    }

    get members(): Member[] {
        return this.props.value.members;
    }

    get deCujus(): Member {
        if (this.props.value.deCujus) {
            return this.props.value.deCujus
        } else {
            throw new Error('No deCujus found')
        }
    }

    public findMember(querriedMember: string) {
        return this.members.find(member => member.member_id === querriedMember)!
    }

    public findSpouseOf(knownSpouseName: string) {
        return this.members.find(member => member.attributes.spouse === knownSpouseName)!
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

    public findParentsOfDecujus(): Member[] {
        return this
            .findParentsOf(this.deCujus.member_id)
            .filter(parent => parent.isEligibleToInherit())
    }

    getMaternals(): Family {
        return Family.create(this.members.filter(member => member.attributes.branch === 'maternelle'))
    }

    getPaternals(): Family {
        return Family.create(this.members.filter(member => member.attributes.branch === 'paternelle'))
    }
}

export type Parents = [Member, Member]

function MemberIsInvalid(member: MemberConstructor): boolean {
    return member.attributes.status !== Status.Valid
}

function memberHasLegalRights(member: MemberConstructor): boolean {
    return member.attributes.legalRights ? member.attributes.legalRights > 0 : false
}

function invalidHeir(members: MemberConstructor[]): boolean {
    return members.some(member => MemberIsInvalid(member) && memberHasLegalRights(member))
}

function haveDuplicates(members: MemberConstructor[]): boolean {
    return R.uniq(members).length !== members.length
}

function sumOfLegalRightsExceedOneHundredPercent(members: MemberConstructor[]): boolean {
    return members.every(
        member => member.attributes.legalRights !== 'unqualified') &&
        members.map(member => member.attributes.legalRights)
            .reduce((a, b) => (a as number) + (b as number), 0)! > 1
}

function isDecujus<T extends MemberConstructor>(member: T): boolean {
    return member.attributes.ordre === 0 && member.attributes.degre === 0
}

function moreThanOneDeCujus(members: MemberConstructor[]): boolean {
    return members.filter(member => isDecujus(member)).length > 1
}