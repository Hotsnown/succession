import { Member, MemberConstructor, LegalRight } from '.'
import * as R from 'ramda'
import { Status } from './Member'
import { Entity } from '../../shared/domain/entities'

export type Refine = (family: Family) => Family

interface FamilyProps {
    value: {
        members: Member[],
        deCujus: Member | undefined
        root: Member | undefined
    }
}

//TODO refactor with immer.js

/**
 * An Immutable Dataclass holding the state of all members
 */
export class Family extends Entity<FamilyProps> {

    public static create(members: MemberConstructor[], rootId?: string): Family {
        if (R.isNil(members)) console.error('Validation Error : Family members can not be Nil.')
        if (members.some(member => member === undefined)) console.error('Validation Error : Family members can not be Nil.')
        if (haveDuplicates(members)) console.error('Invariant Error : Duplicates found.') //members.map(member => member.member_id))
        if (sumOfLegalRightsExceedsOneHundredPercent(members)) console.error('Invariant Error : Sum of legal rights exceeds 100%.', members.map(member => ({ id: member.member_id, legalRights: member.attributes.legalRights })))
        if (moreThanOneDeCujus(members)) console.error('Invariant Error : More than one de cujus found.', members.filter(member => isDecujus(member)).map(deCujus => ({id: deCujus.member_id, attributes: deCujus.attributes})))
        if (invalidHeir(members)) console.error('Invariant Error : ineligible to inherit member has inheritance share.', members.filter(member => memberHasLegalRights(member) && MemberIsInvalid(member))
                                                                                                                         .map(member => ({id: member.member_id, status: member.attributes.status, legalRights: member.attributes.legalRights})))
        
        return new Family(
            {
                value: {
                    members: members.map(member => Member.create(member)),
                    deCujus: members.map(member => Member.create(member))
                        .find(isDecujus), //TODO Better error handling
                    root: rootId ? members.map(member => Member.create(member))
                        .find(member => member.member_id === rootId) : undefined
                }
            })
    }

    get members(): Member[] {
        return this.props.value.members;
    }

    get deCujus(): Member {
        //TODO set deCujus even when we can't guess from degré/ordre
        if (!this.props.value.deCujus) throw new Error('No deCujus found')
        return this.props.value.deCujus
    }

    get root(): Member {
        if (!this.props.value.root) throw new Error('No root found')
        return this.props.value.root
    }

    public findMember(querriedMember: string): Member | undefined {
        if (!this.members.find(member => member.member_id === querriedMember)) console.error(`${querriedMember} has not been found`)
        return this.members.find(member => member.member_id === querriedMember)
    }

    public findSpouseOf(knownSpouseName: string) {
        return this.members.find(member => member.attributes.spouse === knownSpouseName)
    }

    public findParentsOf = (childName: string): Parents => {
        const result = this.members.filter(member => member.props.value.childs.includes(childName))
        return [result[0], result[1]]
    }

    public debug(): Family {
        return this.map(member => {console.log({ id: member.member_id, attributes: member.attributes }); return member})
    }

    public findParentsOfDecujus(): Member[] {
        return this
            .findParentsOf(this.deCujus.member_id)
            .filter(parent => parent.isEligibleToInherit())
    }

    public getMaternals(): Family {
        return Family.create(this.members.filter(member => member.attributes.branch === 'maternelle'))
    }

    public getPaternals(): Family {
        return Family.create(this.members.filter(member => member.attributes.branch === 'paternelle'))
    }

    public indexMembers(): Family {
        return Family.create(this.members.map((member, index) => member.copyWith({index: index})))
    }

    public map(fn: (member: Member) => Member): Family {
        return Family.create(R.map(fn, this.members));
    }

    public filter(pred: (member: Member) => boolean): Family {
        return Family.create(R.filter(pred, this.members))
    }
}

export type Parents = [Member, Member]

function MemberIsInvalid(member: MemberConstructor): boolean {
    return member.attributes.status !== Status.Valid
}

function memberHasLegalRights(member: MemberConstructor): boolean {
    if (member.attributes.legalRights === 'unassigned') {
        return false
    }
    else if (member.attributes.legalRights === undefined) {
        return false
    } else {
        return member.attributes.legalRights.isNotZero()
    }
}

function invalidHeir(members: MemberConstructor[]): boolean {
    return members.some(member => MemberIsInvalid(member) && memberHasLegalRights(member) && !member.attributes.isReprésenté)
}

function haveDuplicates(members: MemberConstructor[]): boolean {
    return R.uniq(members).length !== members.length
}

function sumOfLegalRightsExceedsOneHundredPercent(members: MemberConstructor[]): boolean {
    if (members.some(member => member.attributes.legalRights === undefined)) {
        return false
    } else {
        return members.every(
            member => member.attributes.legalRights !== 'unassigned') &&
            members.map(member => member.attributes.legalRights as LegalRight)
                .reduce((a: LegalRight, b: LegalRight) => (a as unknown as LegalRight).plus(b as unknown as LegalRight), LegalRight.percent('0%'))! > LegalRight.create(1, 1)
    }
}

function isDecujus<T extends MemberConstructor>(member: T): boolean {
    return member.attributes.ordre === 0 && member.attributes.degre === 0
}

function moreThanOneDeCujus(members: MemberConstructor[]): boolean {
    return members.filter(member => isDecujus(member)).length > 1
}