/* prettier-ignore */
/*eslint-disable*/

import { Family, LegalRight, Refine, Ordre, Member } from '../../entities'
import { extractFente } from './utils/Fente'

/**
 * - Si il existe un ascendant dans chaque ligne (mère, père ou autre), chaque ligne récupère la moitié de la succession.
 * - Dans chaque branche succède les ascendants au degré le plus proche.
 * - Les ascendants de même degré se répartissent la succession par tête
 * - A défaut d'ascendant dans une branche, les ascendants de l'autre branche recueillent toute la succession
 */
export const ordreThreeStrategy: Refine = (family) => {

   const parents = family
   .filter(member => member.isParentOfDeCujus(family))
   .filter(parent => parent.isEligibleToInherit())
   .members
   
   switch (parents.length) {
      case 1: return oneParentStrategy(family)
      case 2: return twoParentsStrategy(family)
      default: return normalStrategy(family)
   }
}

const oneParentStrategy: Refine = (family) => {
   return family.copyWith(family.members
      .map(member => member.isParentOfDeCujus(family)
         ? member.copyWith({ legalRights: LegalRight.percent('50%')})
         : member.copyWith({ legalRights: (member.attributes.ordre === Ordre.Ordre3 && member.member_id !== 'father' && member.member_id !== 'mother') 
            ? LegalRight.percent('25%') 
            : LegalRight.percent('0%')})
            ))
}

const twoParentsStrategy: Refine = (family) => {
   return family.map(member => member.copyWith({ legalRights: member.isParentOfDeCujus(family) ? LegalRight.percent('50%') : LegalRight.percent('0%') }))
}

const normalStrategy: Refine = (family) => {
   return Family.create(extractFente(family).members.concat(
      [
         family.findMember('mother')!.copyWith({ legalRights: LegalRight.percent('0%') }), 
         family.findMember('father')!.copyWith({ legalRights: LegalRight.percent('0%') }),
      ]))
}