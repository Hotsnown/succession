import { Family, Degrees, Member } from '../entities'

/** 
 * Each heir who comes to the succession of their chief 
 * receives a share corresponding to their own vocation,
 * that is to say the share which is personally assigned to them.
 * @param filteredMembers
 * @param family
 * @param shares
 * */
export function repartitionParTête(filteredMembers: Family, family: Family, shares = 1): Family {

    const priviledgedMembers = Degrees
        .create(family)
        .getFirstAppliableDegreeMembers(filteredMembers, family)
        .filter(member => member.isEligibleToInherit() || (member.isReprésenté === true))

    const getLegalRightsByHead = (member: Member): number => member.isIn(priviledgedMembers) ? shareByHead(priviledgedMembers, shares) : 0
    const shareByHead = (members: Member[], shares: number): number => shares / members.length

    const updatedMembers = family.members
        .map(member => member.copyWith({ legalRights: getLegalRightsByHead(member) }))

    return family.copyWith(updatedMembers)
}