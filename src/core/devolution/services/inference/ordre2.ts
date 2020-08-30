/* prettier-ignore */
/*eslint-disable*/

import { Refine } from '../../entities'
import { assignRepresentation} from '../qualification/Représentation'
import { repartitionParTête, répartitionParSouche } from '../inference'
import { répartitionEnConcoursPèreOuMère, répartitionEnConcoursPèreEtMère } from './utils/RépartitionEnConcours'

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
        .map(member => {console.log(member.member_id); return member})
        .filter(parent => parent.isEligibleToInherit())

    switch (parents.length) {
        case 1: return répartitionEnConcoursPèreOuMère(family, parents)
        case 2: return répartitionEnConcoursPèreEtMère(family, parents)
        case 0: return normalStrategy(family)
        default: throw new Error('Should not be reachable')
    }
}

const normalStrategy: Refine = (family) => {
    const qualifiedFamily = assignRepresentation(family)

    const représentantsExist = qualifiedFamily.members.some(member => member.isReprésentant)

    if (représentantsExist) {
        return répartitionParSouche(qualifiedFamily)
    } else {
        return repartitionParTête(qualifiedFamily, qualifiedFamily)
    }
}