/* prettier-ignore */
/*eslint-disable*/

import { Family, Member, LegalRight, Refine, Degree } from '../../entities'
import { assignRepresentation} from '../qualification/Représentation'
import { repartitionParTête, computeRepresentation } from '../inference'

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
    const parents = family.members
        .filter(member => member.isParentOfDeCujus(family))
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

    const familyWithoutParents = Family.create(family.members.filter(member => !member.isParentOfDeCujus(family)), family.deCujus.member_id)
    const priviledgedMembers = repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%'))

    return Family.create(
        [
            ...parents.map(member => member.copyWith({ legalRights: LegalRight.percent('50%')})),
            ...priviledgedMembers.members,
        ],
        family.deCujus.member_id
    )
}

function twoParentsStrategy(family: Family, parents: Member[]): Family {

    const qualifiedFamily = assignRepresentation(family)
    const doReprésentantsExist = qualifiedFamily.members.some(member => member.isReprésentant)

    const familyWithoutParents = Family.create(family.members.filter(member => !member.isParentOfDeCujus(family)), family.deCujus.member_id)
    const qualifiedFamilyWithoutParents = assignRepresentation(familyWithoutParents)

    if (doReprésentantsExist) {
        return Family.create([
            ...computeRepresentation(qualifiedFamilyWithoutParents, Degree.Degree2, LegalRight.percent('50%')).members,
            ...parents.filter(member => member !== undefined).map(member => member.copyWith({ legalRights: LegalRight.percent('25%')}))
            ],
            family.deCujus.member_id)
    } else {
        return Family.create([
            ...repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%')).members,
            ...parents.map(member => member.copyWith({ legalRights: LegalRight.percent('25%')}))
        ],
        family.deCujus.member_id)
    }
}