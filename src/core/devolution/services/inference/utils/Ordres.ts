/* prettier-ignore */
/*eslint-disable*/

import { Member, Family, Ordre } from '../../../entities';
import * as R from 'ramda'

type MembersGroupedByOrdre = Record<string, Member[]>
const ordres = [Ordre.Ordre1, Ordre.Ordre2, Ordre.Ordre3, Ordre.Ordre4]

/**
 * @desc Members are divided into four classes where each classe exclude other classes.
 *  If there are no members in one class, the property goes to all the members in the next class.
 */
export function getFirstAppliableOrdre (family: Family): Family {
    const membersGroupedByOrdre = byOrdre(family.members)
    for (const ordre in ordres) {
        if (membersGroupedByOrdre[ordre] !== undefined) {
            if(atLeastOneMemberEligibleToInheritIn(membersGroupedByOrdre, ordre)) {
                return Family.create(membersGroupedByOrdre[ordre], family.deCujus.member_id)
            }
        }
    }
    console.error('Should not be reachable')
}

export function atLeastOneMemberEligibleToInheritIn(membersGroupedByOrdre: MembersGroupedByOrdre, ordre: string): boolean {
    return membersGroupedByOrdre[ordre].some(member => member.isEligibleToInherit());
}

export function getFirstAppliableOrdreNumber (family: Family): number {
    const membersGroupedByOrdre = byOrdre(family.members)
    for (const ordre of ordres) {
        if (membersGroupedByOrdre[ordre] !== undefined) {
            if(atLeastOneMemberEligibleToInheritIn(membersGroupedByOrdre, ordre.toString())) {
                if (parseInt(ordre.toString()) === Ordre.Ordre2) {
                    return computePriviledgeAscendantOrdre(family)
                }    
                return parseInt(ordre.toString())
            }
        }
    }
    console.error('Should not be reachable')
}

function computePriviledgeAscendantOrdre(family: Family): Ordre.Ordre2 | Ordre.Ordre3 {
    const parents = family.findParentsOf(family.deCujus.member_id)
    if (noPriviledgedCollateral(family, parents)) {
        return Ordre.Ordre3
    } else {
        return Ordre.Ordre2
    }
}

function noPriviledgedCollateral(family: Family, parents: [Member, Member]): boolean {
    //potential bug: it may filter out priviledged collaterals
    return family.members
        .filter(member => !parents.includes(member))
        .filter(member => member.attributes.ordre === Ordre.Ordre2)
        .filter(member => member.isEligibleToInherit())
        .length === 0;
}

export const byOrdre = R.groupBy(
    (member: Member) => {
        const ordre = member.attributes.ordre
        return  ordre === 'unassigned' ? 'unassigned' :
                ordre === 'outsider' ? 'outsider' :
                ordre === 0 ? '0' :
                ordre === 1 ? '1' :
                ordre === 2 ? '2' :
                ordre === 3 ? '3' :
                ordre === 4 ? '4' : 'unknown'
        })
