import { Family, Member, repartitionParTête, computeRepresentation, assignRepresentation } from '../../entities'

//TODO potential bug when there is only one parent in input

export function ordreTwoStrategy(family: Family): Family {
    // 1/ qualifiedFamily
    //    Nombre de collatéraux = nombre de membres du degrés le plus proche + nombre de souche
    //    Nombre de parent survivant
    // 2/ CALCUL
    //    si parent survivant = 1 : 50% + 50% / nombre de collatéraux (ne pas oublier la représentation)
    //    si parent survivant = 2 : 25% + 25% + 50% / nombre de collatéraux (ne pas oublier la représentation)
    //    si parent survivant = 0
    //
    const parents = family
        .findParentsOf(family.deCujus.member_id)
        .filter(member => member !== undefined)
        .filter(parent => parent.isEligibleToInherit())

    switch (parents.length) {
        case 1: return oneParentStrategy(family, parents)
        case 2: return twoParentsStrategy(family, parents)
        case 0: return normalStrategy(family)
        default: throw new Error('Should not be reachable')
    }
}

function normalStrategy(family: Family): Family {
    const qualifiedFamily = assignRepresentation(family)

    const représentantsExist = qualifiedFamily.members.some(member => member.isReprésentant)

    if (représentantsExist) {
        return computeRepresentation(qualifiedFamily)
    } else {
        return repartitionParTête(qualifiedFamily, qualifiedFamily)
    }
}

function oneParentStrategy(family: Family, parents: Member[]): Family {

    const familyWithoutParents = Family.create(family.members.filter(member => !member.isIn(parents)))
    const priviledgedMembers = repartitionParTête(familyWithoutParents, familyWithoutParents, 1 / 2)

    return family.copyWith(family.members
        .map(member => member.isIn(parents)
            ? member.copyWith({ legalRights: 1 / 2 })
            : member.copyWith({ legalRights: priviledgedMembers.findMember(member.member_id)!.legalRights })))
}

function twoParentsStrategy(family: Family, parents: Member[]): Family {

    const qualifiedFamily = assignRepresentation(family)

    const représentantsExist = qualifiedFamily.members.some(member => member.isReprésentant)

    const familyWithoutParents = Family.create(family.members.filter(member => !member.isIn(parents)))
    const qualifiedFamilyWithoutParents = assignRepresentation(familyWithoutParents)

    const priviledgedMembers = repartitionParTête(familyWithoutParents, familyWithoutParents, 1 / 2)
    const priviledgedMemberswithReprésentantion = computeRepresentation(qualifiedFamilyWithoutParents, 2, 1 / 2)

    if (représentantsExist) {
        return family.copyWith(family.members
            .map(member => member.copyWith({
                legalRights: member.isIn(parents)
                    ? 1 / 4
                    : priviledgedMemberswithReprésentantion.findMember(member.member_id)!.legalRights
            })))
    } else {
        return family.copyWith(family.members
            .map(member => member.copyWith({
                legalRights: member.isIn(parents)
                    ? 1 / 4
                    : priviledgedMembers.findMember(member.member_id) !== undefined
                        ? priviledgedMembers.findMember(member.member_id)!.legalRights
                        : 999
            })))
    }

}