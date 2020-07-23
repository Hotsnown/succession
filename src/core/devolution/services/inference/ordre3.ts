/* prettier-ignore */
/*eslint-disable*/

import { Family, LegalRight, Refine, Ordre, Member } from '../../entities'
import { repartitionParTête, excludeInheligible } from '../inference'
import { assignFenteAscendante } from '../qualification/Fente'

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

const normalStrategy: Refine = (family) => {

   const { maternals, paternals } = assignFenteAscendante(family).getBranches()

   if (nobodyRemainingIn(maternals)) {
      return repartitionParTête(paternals, family)
   } else if (nobodyRemainingIn(paternals)) {
      return repartitionParTête(maternals, family)
   } else {
      //TODO: remove hard coded find
      if (!family.findMember('mother') || !family.findMember('father')) throw new Error('No mother/father found')
      return Family.create(
         [
            ...repartitionParTête(paternals, paternals, LegalRight.percent('50%')).members,
            ...repartitionParTête(maternals, maternals, LegalRight.percent('50%')).members,
            family.findMember('mother')!.copyWith({ legalRights: LegalRight.percent('0%') }), 
            family.findMember('father')!.copyWith({ legalRights: LegalRight.percent('0%') }),
         ]
      )
   }
}

function nobodyRemainingIn(side: Family): boolean {
   return excludeInheligible(side).members.length === 0
}

const oneParentStrategy: Refine = (family) => {
   return family.copyWith(family.members
      .map(member => member.isParentOfDeCujus(family)
         ? member.copyWith({ legalRights: LegalRight.create(1, 2)})
         : member.copyWith({ legalRights: (member.attributes.ordre === Ordre.Ordre3 && member.member_id !== 'father' && member.member_id !== 'mother') 
            ? LegalRight.create(1, 4) 
            : LegalRight.zeroRight()})
            ))
}

const twoParentsStrategy: Refine = (family) => {
   return family.map(member => member.copyWith({ legalRights: member.isParentOfDeCujus(family) ? LegalRight.percent('50%') : LegalRight.percent('0%') }))
}

//TODO: ??
function isPriviledgedAscendant(member: Member) {
   return (member.attributes.ordre === Ordre.Ordre3 && member.member_id !== 'father' && member.member_id !== 'mother')
}