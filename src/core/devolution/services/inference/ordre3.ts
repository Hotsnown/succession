import { Family, LegalRight, Refine, Ordre } from '../../entities'
import { repartitionParTête, excludeInheligible } from '.'
import { assignFenteAscendante } from '../qualification/Fente'

/**
 * - Si il existe un ascendant dans chaque ligne (mère, père ou autre), chaque ligne récupère la moitié de la succession.
 * - Dans chaque branche succède les ascendants au degré le plus proche.
 * - Les ascendants de même degré se répartissent la succession par tête
 * - A défaut d'ascendant dans une branche, les ascendants de l'autre branche recueillent toute la succession
 */
export const ordreThreeStrategy: Refine = (family) => {
   
   switch (family.findParentsOfDecujus().length) {
      case 1: return oneParentStrategy(family)
      case 2: return twoParentsStrategy(family)
      default: return normalStrategy(family)
   }
}

const normalStrategy: Refine = (family) => {

   //TODO: use destructuring (ex const {maternals, paternals} = assignFenteAscendante())
   const qualification = assignFenteAscendante(family)

   const maternals = qualification.getMaternals()
   const paternals = qualification.getPaternals()

   if (noMotherSideRemaining(maternals)) {
      return repartitionParTête(paternals, family)
   } else if (noFatherSideRemaining(paternals)) {
      return repartitionParTête(maternals, family)
   } else {
      //TODO: remove hard coded find
      if (!family.findMember('mother') || !family.findMember('father')) throw new Error('No mother/father found')
      return Family.create(
         repartitionParTête(paternals, paternals, 1 / 2).members.concat(
         repartitionParTête(maternals, maternals, 1 / 2).members.concat(
            [
               family.findMember('mother')!.copyWith({legalRights: LegalRight.zeroRight()}), 
               family.findMember('father')!.copyWith({legalRights: LegalRight.zeroRight()})
            ]
         ))
      )
   }
}

function noFatherSideRemaining(paternals: Family): boolean {
   return excludeInheligible(paternals).members.length === 0
}

function noMotherSideRemaining(maternals: Family): boolean {
   return excludeInheligible(maternals).members.length === 0
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
   return family.copyWith(family.members
      .map(member => member.copyWith({ legalRights: member.isParentOfDeCujus(family) ? LegalRight.create(1, 2) : LegalRight.zeroRight()})))
}