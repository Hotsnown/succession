import { Family, Devolution, Qualification } from '../entities'

/**
 * - Si il existe un ascendant dans chaque ligne (mère, père ou autre), chaque ligne récupère la moitié de la succession.
 * - Dans chaque branche succède les ascendants au degré le plus proche.
 * - Les ascendants de même degré se répartissent la succession par tête
 * - A défaut d'ascendant dans une branche, les ascendants de l'autre branche recueillent toute la succession
 */
export function ordreThreeStrategy(family: Family): Family {
   
   switch (family.findParentsOfDecujus().length) {
      case 1: return oneParentStrategy(family)
      case 2: return twoParentsStrategy(family)
      default: return normalStrategy(family)
   }

}

function normalStrategy(family: Family) {

   const devolution = new Devolution(family)
   const qualification = new Qualification(family).assignFenteAscendante(family)

   const maternals = qualification.getMaternals()
   const paternals = qualification.getPaternals()

   if (noMotherSideRemaining(devolution, maternals)) {
      return devolution.repartitionParTête(paternals, family)
   } else if (noFatherSideRemaining(devolution, paternals)) {
      return devolution.repartitionParTête(maternals, family)
   } else {
      return Family.create(
         devolution.repartitionParTête(paternals, paternals, 1 / 2).members.concat(
         devolution.repartitionParTête(maternals, maternals, 1 / 2).members)
      )
   }
}

function noFatherSideRemaining(devolution: Devolution, paternals: Family) {
   return devolution.excludeInheligible(paternals).members.length === 0
}

function noMotherSideRemaining(devolution: Devolution, maternals: Family) {
   return devolution.excludeInheligible(maternals).members.length === 0
}

function oneParentStrategy(family: Family): Family {
   return family.copyWith(family.members
      .map(member => member.isParentOfDeCujus(family)
         ? member.copyWith({ legalRights: 1 / 2 })
         : member.copyWith({ legalRights: member.attributes.ordre === 3 ? 1 / 4 : 0 })))
}

function twoParentsStrategy(family: Family): Family {
   return family.copyWith(family.members
      .map(member => member.copyWith({ legalRights: member.isParentOfDeCujus(family) ? 1 / 2 : 0 })))
}