/* prettier-ignore */
/*eslint-disable*/

import { Member, MemberConstructor, LegalRight } from '../entities'
import * as R from 'ramda'
import { Status } from './Member'
import { Entity } from '../../shared/domain/entities'

export type Refine = (family: Family) => Family

interface FamilyProps {
    value: {
        members: Member[],
        deCujus: Member | undefined
        root?: Member
    }
}

//TODO refactor with immutable library (immer.js)

/**
 * An Immutable Dataclass holding the state of all members
 */
export class Family extends Entity<FamilyProps> {

    public static create(members: MemberConstructor[], deCujusId: string, rootId?: string): Family {
        if (R.isNil(members)) console.error('Validation Error : Family members can not be Nil.')
        if (!Array.isArray(members)) throw new Error()//console.error('Validation Error: Family members must be an array or a ' + typeof members + ' has been provided.')
        if (members.some(member => member === undefined)) console.error('Validation Error : Family members can not be Nil.')
        if (haveDuplicates(members)) console.error('Invariant Error : Duplicates found.') //members.map(member => member.member_id))
        if (sumOfLegalRightsExceedsOneHundredPercent(members)) console.error('Invariant Error : Sum of legal rights exceeds 100%.', members.map(member => ({ id: member.member_id, legalRights: member.attributes.legalRights })))
        if (moreThanOneDeCujus(members)) console.error('Invariant Error : More than one de cujus found.', members.filter(member => isDecujus(member)).map(deCujus => ({id: deCujus.member_id, attributes: deCujus.attributes})))
        if (invalidHeir(members)) console.error('Invariant Error : ineligible to inherit member has inheritance share.', members
                                                                                                                         .filter(member => memberHasLegalRights(member) && MemberIsInvalid(member))
                                                                                                                         .map(member => ({id: member.member_id, status: member.attributes.status, legalRights: member.attributes.legalRights})))
        
        if (deCujusId && !members.find(member => member.member_id === deCujusId)) console.error('The provided de cujus (' + deCujusId + ') has not been found in the family')
        if (rootId && !members.find(member => member.member_id === rootId)) console.error('The provided de cujus (' + rootId + ') has not been found in the family')
                
        return new Family(
            {
                value: {
                    members: members.map(member => Member.create(member)),
                    deCujus: members.map(member => Member.create(member)).find(member => member.member_id === deCujusId),
                    root: members.map(member => Member.create(member)).find(member => member.member_id === rootId)
                }
            })
    }

    get members(): Member[] {
        return this.props.value.members;
    }

    get deCujus(): Member {
        if (this.props.value.deCujus) {
            return this.props.value.deCujus
        } else if (this.members.find(isDecujus)) {
            return this.members.find(isDecujus)
        } else {
            throw new Error('No deCujus found')
        }
    }

    get root(): Member {
        if (this.props.value.root) {
            return this.props.value.root
        } else {
            throw new Error('No root found')
        }
    }

    public findMember(querriedMember: string) {
        return this.members.find(member => member.member_id === querriedMember)
    }

    public findSpouseOf(knownSpouseName: string) {
        return this.members.find(member => member.attributes.spouse === knownSpouseName)
    }

    public findParentsOf = (childName: string): Parents => {
        const result = this.members.filter(member => member.props.value.childs.includes(childName))
        return [result[0], result[1]]
    }

    public copyWith(members: Member[]): Family {
        return Family.create(members, this.deCujus.member_id);
    }

    public debug(): Family {
        this.members.map(member => console.log({ id: member.member_id, attributes: member.attributes }))
        return this
    }

    public findParentsOfDecujus(): Member[] {
        return this
            .findParentsOf(this.deCujus.member_id)
            .filter(parent => parent !== undefined)
            .filter(parent => parent.isEligibleToInherit())
    }

    public getBranches(): { maternals: Branch, paternals: Branch } {
        return {
            maternals: Branch.create(this.members.filter(member => member.attributes.branch === 'maternelle'), this.deCujus.member_id),
            paternals: Branch.create(this.members.filter(member => member.attributes.branch === 'paternelle'), this.deCujus.member_id)
        }
    }

    public indexMembers(): Family {
        return Family.create(this.members.map((member, index) => member.copyWith({index: index})), this.deCujus.member_id, this.root.member_id)
    }
}

class Branch extends Family {

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
                .reduce((a: LegalRight, b: LegalRight) => (a as unknown as LegalRight).plus(b as unknown as LegalRight), LegalRight.zeroRight())! > LegalRight.create(1, 1)
    }
}

function isDecujus<T extends MemberConstructor>(member: T): boolean {
    return member.attributes.ordre === 0 && member.attributes.degre === 0
}

function moreThanOneDeCujus(members: MemberConstructor[]): boolean {
    return members.filter(member => isDecujus(member)).length > 1
}