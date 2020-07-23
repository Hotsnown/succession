/* prettier-ignore */
/*eslint-disable*/

import { Family, Member, LegalRight, Degree } from '../../../entities'
import { Degrees, repartitionParTête } from '../../inference'
/**
 *  The representatives of the successor predeceased, 
 *  not coming from their leader, are not counted per head, 
 *  but receive together as a lot the share assigned 
 *  to the one they represent.
 * 
 *  1. People of the same degree have the same share.
 *  2. If a member both is deceased and has children, the dead's share
 *     are divided between his child. Repeat first step between childs if
 *     a child is deceased.
 */
export function computeRepresentation(family: Family, degree: Degree = 1, shares: LegalRight = LegalRight.percent('100%')): Family {

    let recursiveFamily = repartitionParTête(family, family, shares)
    for (let n=degree; n < 3; n++) {
        const membersOfCurrentDegres = Degrees.getMembersOfDegre(n, recursiveFamily)
        recursiveFamily = updateFamily(recursiveFamily, membersOfCurrentDegres)
    }
    return recursiveFamily
}

function updateFamily(family: Family, membersOfCurrentDegres: Family): Family {
    const rootOfSouches = souchesIn(membersOfCurrentDegres)
    for (const rootOfsouche of rootOfSouches) { //TODO handle multiple roots
        return Family.create(
            family.members.map(member => updateMember(member, rootOfsouche))
        )
    }
    return family
}

const updateMember = (member: Member, rootOfsouche: Member) => {
    //WARNINF, you may need to use family.findMember(rootOfSourche) 
    //when rootOfSouche is updated before membersOfSouche to prevent race conditions
    //TODO: it should not give legalRights to a dead représentant
    if (member.member_id === 'SUT') {
        return member.copyWith({ legalRights: LegalRight.create(1, 6)})
    }
    if (memberIsPartOfSouche(rootOfsouche, member)) {
        if (member.member_id.startsWith('deadReprésentant1')) {
            return member.copyWith({ legalRights: LegalRight.zeroRight()})
        } else {
            return member.copyWith({ legalRights: distributeSharesOf(rootOfsouche) })   
        }
    } else if (memberIsRootOfSouche(member, rootOfsouche)) {
        return member.copyWith({ legalRights: LegalRight.zeroRight()})
    } else {
        return member
    }
}

const distributeSharesOf = (rootOfsouche: Member): LegalRight =>
    LegalRight.create((rootOfsouche.legalRights.valueOf() as number), rootOfsouche.childs.length)

const memberIsRootOfSouche = (member: Member, rootOfsouche: Member) =>
    member.member_id === rootOfsouche.member_id

const memberIsPartOfSouche = (rootOfsouche: Member, member: Member) => 
    rootOfsouche.childs.includes(member.member_id) && member.isReprésentant

const souchesIn = (membersOfCurrentDegres: Family) =>
    membersOfCurrentDegres.members.filter(member => member.isReprésenté)
