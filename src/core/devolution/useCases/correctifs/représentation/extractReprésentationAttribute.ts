import { Family } from '../../../entities'

/**
 * If a descendant or a sibling predeceases the de cujus, his share goes to his descendants
 * by representation — for example, if a father leaves property to his daughter, and at his 
 * death the daughter has already died, leaving two grandchildren, the grandchildren would 
 * take their mother’s share.
 * @param members Family structure under examination
 **/
export function assignRepresentation(family: Family): Family {

    //sequence matter
    family.members.forEach(member => 
        member.isReprésenté = member.isReprésentableIn(family))
    family.members.forEach(member => 
        member.isReprésentant = member.isRepresentativeIn(family))

    return family
}

export function computeRepresentation(family: Family): Family {
    const result = family.getMostFavoredMembersByDegre(family.getMostFavoredMembersByOrdre())
    for (const member of result.members) {
        if (member.isReprésenté) {
            const legalChilds = member.childs
                .map(child => family.findMember(child))
                .filter(child => child.isReprésentant)
                .filter(child => child.isEligibleToInherit())

            for (const child of legalChilds) {
                child.legalRights = member.legalRights / member.childs.length //TODO recursive representation
            }
            member.legalRights = 0
            return family
        }
    }
    return family
}