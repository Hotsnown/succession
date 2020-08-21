/* prettier-ignore */
/*eslint-disable*/

import { Family, LegalRight, Refine } from '../../entities'
import { extractFente } from './utils/Fente'
import { repartitionParTête } from './utils/RépartitionParTête'

/**
 * - Si il existe un ascendant dans chaque ligne (mère, père ou autre), chaque ligne récupère la moitié de la succession.
 * - Dans chaque branche succède les ascendants au degré le plus proche.
 * - Les ascendants de même degré se répartissent la succession par tête
 * - A défaut d'ascendant dans une branche, les ascendants de l'autre branche recueillent toute la succession
 */
export const ordreThreeStrategy: Refine = (family) => {


   const familyWithoutParents = family.filter(member => !member.isParentOfDeCujus(family) || !member.isEligibleToInherit())

   const parents = family
      .filter(member => member.isParentOfDeCujus(family) && member.isEligibleToInherit())
      .members


   const oneParentStrategy: Refine = (family) => {
      return Family.create([
         ...parents.map(member => member.copyWith({legalRights: LegalRight.percent('50%')})),
         ...repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%')).members
         
      ])
   }

   const twoParentsStrategy: Refine = (family) => {
      return Family.create(
         [
            ...parents.map(member => member.copyWith({legalRights: LegalRight.percent('50%')})),
            ...familyWithoutParents.map(member => member.copyWith({legalRights: LegalRight.percent('0%')})).members,
         ]
      )
   }

   const normalStrategy: Refine = (family) => {
      return Family.create(
         extractFente(family).members.concat(
         [
            ...family.findParentsOf(family.deCujus.member_id).map(member => member.copyWith({legalRights: LegalRight.percent('0%')}))
         ])
      )
   }
   
   switch (parents.length) {
      case 0: return normalStrategy(family)
      case 1: return oneParentStrategy(family)
      case 2: return twoParentsStrategy(family)
      default: throw new Error('Should not be reachable')
   }  
}
