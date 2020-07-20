import { Family, LegalRight, Refine, Ordre, Member } from '../../entities'
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
         repartitionParTête(paternals, paternals, LegalRight.percent('50%')).members.concat(
         repartitionParTête(maternals, maternals, LegalRight.percent('50%')).members.concat(
            [
               family.findMember('mother')!.copyWith({legalRights: LegalRight.percent('0%')}), 
               family.findMember('father')!.copyWith({legalRights: LegalRight.percent('0%')})
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
   return family.map(member => member.isParentOfDeCujus(family)
         ? member.copyWith({ legalRights: LegalRight.percent('50%')})
         : member.copyWith({ legalRights: isPriviledgedAscendant(member) 
            ? LegalRight.percent('25%')
            : LegalRight.percent('0%')})
            )
}

const twoParentsStrategy: Refine = (family) => {
   return family.map(member => member.copyWith({ legalRights: member.isParentOfDeCujus(family) ? LegalRight.percent('50%') : LegalRight.percent('0%') }))
}

function isPriviledgedAscendant(member: Member) {
   return (member.attributes.ordre === Ordre.Ordre3 && member.member_id !== 'father' && member.member_id !== 'mother')
}