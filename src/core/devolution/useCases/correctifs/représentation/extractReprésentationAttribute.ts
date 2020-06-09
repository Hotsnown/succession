import { Family } from '../../../entities'

export function computeRepresentation(family: Family): Family {
    const result = family.getMostFavoredMembersByDegre(family.getMostFavoredMembersByOrdre())
    for (const member of result.members) {
        if (member.isReprésenté) {
            const legalChilds = member.childs
                .map(child => family.findMember(child))
                .filter(child => child.isReprésentant)
                .filter(child => child.isEligibleToInherit())

            for (const child of legalChilds) {
                if (member.legalRights !== 'unassessed') {
                    child.legalRights = member.legalRights / member.childs.length //TODO recursive representation
                }
            }
            member.legalRights = 0
            return family
        }
    }
    return family
}