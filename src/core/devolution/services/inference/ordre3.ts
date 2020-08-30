/* prettier-ignore */
/*eslint-disable*/

import { Family, LegalRight, Refine } from '../../entities'
import { répartitionParBranche } from './utils/RépartitionParBranche'
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

      const parentBranch = parents[0].attributes.branch
      const otherSideBranch = parentBranch !== 'unassigned' && parentBranch === 'paternelle' ? 'maternelle' : 'paternelle'
      const otherSide = Family.create(familyWithoutParents.members.filter(member => member.attributes.branch === otherSideBranch), family.deCujus.member_id)
            
      if (otherSide.members.filter(member => member.isEligibleToInherit()).length === 0) return Family.create([
         ...parents.map(member => member.copyWith({legalRights: LegalRight.percent('100%')})),
         ...family.members.map(member => member.copyWith({ legalRights: LegalRight.percent('0%')}))
      ],
      family.deCujus.member_id)
      else {
         const ret = [
            ...parents.map(member => member.copyWith({legalRights: LegalRight.percent('50%')})),
            ...repartitionParTête(otherSide, otherSide, LegalRight.percent('50%'), family.deCujus.member_id).members
         ]
         const notIncluded = family.members.filter(m => !ret.map(m => m.member_id).includes(m.member_id)).map(m => m.copyWith({ legalRights: LegalRight.percent('0%')}))

         return Family.create(ret.concat(notIncluded), family.deCujus.member_id)
      }  
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
         répartitionParBranche(family).members.concat(
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
