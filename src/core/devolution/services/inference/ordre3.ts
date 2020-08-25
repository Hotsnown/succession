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

   const familyWithoutParents = Family.create(family.members.filter(member => !member.isParentOfDeCujus(family) || !member.isEligibleToInherit()), family.deCujus.member_id)

   const parents = family.members
      .filter(member => member.isParentOfDeCujus(family) && member.isEligibleToInherit())


   const oneParentStrategy: Refine = (family) => {
      return Family.create([
         ...parents.map(member => member.copyWith({legalRights: LegalRight.percent('50%')})),
         ...repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%')).members
         
      ],
      family.deCujus.member_id)
   }

   const twoParentsStrategy: Refine = (family) => {
      return Family.create(
         [
            ...parents.map(member => member.copyWith({legalRights: LegalRight.percent('50%')})),
            ...familyWithoutParents.members.map(member => member.copyWith({legalRights: LegalRight.percent('0%')})),
         ],
         family.deCujus.member_id
      )
   }

   const normalStrategy: Refine = (family) => {
      return Family.create(
         extractFente(family).members.concat(
         [
            ...family.findParentsOf(family.deCujus.member_id).map(member => member.copyWith({legalRights: LegalRight.percent('0%')}))
         ]),
         family.deCujus.member_id
      )
   }
   
   switch (parents.length) {
      case 0: return normalStrategy(family)
      case 1: return oneParentStrategy(family)
      case 2: return twoParentsStrategy(family)
      default: throw new Error('Should not be reachable')
   }  
}
