/* prettier-ignore */
/*eslint-disable*/

import { Family, Ordre, Member, Représenté, Representant } from "../../entities"
import * as R from 'ramda'

/**
 * A representant is a descendant of a predeceased heir (a représenté).
**/
export function assignRepresentation(family: Family): Family {

    const assignReprésenté =
        (family: Family) => Family.create(family.members.map(member => member.copyWith({ isReprésenté: isReprésentéIn(member, family) })), family.deCujus.member_id)

    
    const assignReprésentant = 
        (family: Family) => Family.create(family.members.map(member => member.copyWith({ isReprésentant: isReprésentantIn(member, family) })), family.deCujus.member_id)

    return R.pipe(
        assignReprésenté,
        assignReprésentant,
    )(family)
}

function isReprésentéIn(member: Member, family: Family): Représenté {
    return R.allPass([
        belongsToEligibleOrdre,
        doDeCujusHavePotentialReprésentant,
        isIneligibleToInherit,
        hasChildEligibleToInherit
    ])(member, family)
}

type isReprésentéIn = (member: Member, family: Family) => boolean

const belongsToEligibleOrdre: isReprésentéIn = (member, family) => member.belongsTo(Ordre.Ordre1) || member.belongsTo(Ordre.Ordre2)
const doDeCujusHavePotentialReprésentant: isReprésentéIn = (member, family) => family.deCujus.hasChildEligibleToInheritIn(family) || family.deCujus.hasSiblingEligibleToInheritIn(family)
const isIneligibleToInherit: isReprésentéIn = (member, family) => !member.isEligibleToInherit()
const hasChildEligibleToInherit: isReprésentéIn = (member, family) => member.hasChildEligibleToInheritIn(family)

type isReprésentantIn = (member: Member, family: Family) => boolean

function isReprésentantIn(member: Member, family: Family): Representant {
    return R.allPass([
        isDescendantOfAReprésenté,
        isNotSiblingOfDeCujus,
        isNotDeCujus
    ])(member, family)
}

const isNotDeCujus: isReprésentantIn = (member, family) => {
    return member.member_id !== family.deCujus.member_id
}

const isNotSiblingOfDeCujus: isReprésentantIn = (member, family) => {
    return member.isNotSiblingOfDeCujus(family)
}

const isDescendantOfAReprésenté: isReprésentantIn = (member, family) => {
    return member.isDescendantOfARepresenté(family)
}
