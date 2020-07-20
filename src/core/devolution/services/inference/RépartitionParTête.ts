import { Family, Member, LegalRight } from '../../entities'
import { Degrees } from '.'

/** 
 * Each heir who comes to the succession of their chief 
 * receives a share corresponding to their own vocation,
 * that is to say the share which is personally assigned to them.
 * @param filteredMembers
 * @param family
 * @param shares
 * */
export function repartitionParTête(filteredMembers: Family, family: Family, shares: LegalRight = LegalRight.create(1, 1)): Family {

    const priviledgedMembers = Degrees
        .create(family)
        .getFirstAppliableDegreeMembers(filteredMembers, family)
        .filter(member => member.isEligibleToInherit() || (member.isReprésenté === true))

    const getLegalRightsByHead = (member: Member): LegalRight => member.isIn(priviledgedMembers) ? shareByHead(priviledgedMembers, shares) : LegalRight.percent('0%')
    const shareByHead = (members: Member[], shares: LegalRight): LegalRight => LegalRight.create(shares.valueOf(), members.length)

    return family.map(member => member.copyWith({ legalRights: getLegalRightsByHead(member) }))
}