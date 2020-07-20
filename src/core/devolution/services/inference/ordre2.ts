import { Family, Member, LegalRight, Refine, Degree } from '../../entities'
import { assignRepresentation} from '../qualification/Représentation'
import { repartitionParTête, computeRepresentation } from '.'

//TODO potential bug when there is only one parent in input

export const ordreTwoStrategy: Refine = (family) => {
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

const normalStrategy: Refine = (family) => {
    const qualifiedFamily = assignRepresentation(family)

    const représentantsExist = qualifiedFamily.members.some(member => member.isReprésentant)

    if (représentantsExist) {
        return computeRepresentation(qualifiedFamily)
    } else {
        return repartitionParTête(qualifiedFamily, qualifiedFamily)
    }
}

function oneParentStrategy(family: Family, parents: Member[]): Family {

    const familyWithoutParents = family.filter(member => !member.isIn(parents))
    const priviledgedMembers = repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%'))

    return family.map(member => member.isIn(parents)
            ? member.copyWith({ legalRights: LegalRight.percent('50%')})
            : member.copyWith({ legalRights: priviledgedMembers.findMember(member.member_id)!.legalRights }))
}

function twoParentsStrategy(family: Family, parents: Member[]): Family {

    const qualifiedFamily = assignRepresentation(family)

    const représentantsExist = qualifiedFamily.members.some(member => member.isReprésentant)

    const familyWithoutParents = family.filter(member => !member.isIn(parents))
    const qualifiedFamilyWithoutParents = assignRepresentation(familyWithoutParents)

    const priviledgedMembers = repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%'))
    const priviledgedMemberswithReprésentantion = computeRepresentation(qualifiedFamilyWithoutParents, Degree.Degree2, LegalRight.percent('50%'))

    if (représentantsExist) {
        return family.map(member => member.copyWith({
                legalRights: member.isIn(parents)
                    ? LegalRight.percent('25%')
                    : priviledgedMemberswithReprésentantion.findMember(member.member_id)!.legalRights
            }))
    } else {
        return family.map(member => member.copyWith({
                legalRights: member.isIn(parents)
                    ? LegalRight.percent('25%')
                    : priviledgedMembers.findMember(member.member_id) !== undefined
                        ? priviledgedMembers.findMember(member.member_id)!.legalRights
                        : LegalRight.create(1, 999) //status code for error
            }))
    }

}