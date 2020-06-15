import { Family, Ordres, Devolution, Qualification } from '../../entities'

/**
 * When the de cujus dies without a spouse.
 */
export function getSolution(family: Family): Family {
   const strategy = Ordres.create(family).getFirstAppliableOrdreNumber()

   switch (strategy) {
      case 1: return ordreOneStrategy(family)
      case 2: return OrdreTwoStrategy(family)
      case 3: return ordreThreeStrategy(family)
      case 4: return ordreFourStrategy(family)
      default: return family
   }
}

/**
 * Conditions: 
 * Existence de descendants de X en ligne directe vivants ?(enfants, petits-
 * enfants, arrière-petits-enfants...)
 */
function ordreOneStrategy(family: Family): Family {
   /*
   1) les personnes du même degré ont la même part.
   2) Si 1 défunt dans le degré privilégié + le défunt a des enfants, les enfants 
      se partagent la part du défunt. Réitérer 1
   */

   const qualification = new Qualification(family)
   const devolution = new Devolution(family)

   return devolution.getMostFavoredMembersByOrdre().members.some(member=> !member.isEligibleToInherit() && member.hasChildEligibleToInheritIn(family)) 
   ? devolution.computeRepresentation(qualification.assignRepresentation())
   : devolution.repartitionParTête(devolution.excludeInheligible(devolution.getMostFavoredMembersByOrdre()), family)
}

function OrdreTwoStrategy(family: Family): Family {
   // 1/ QUALIFICATION
   //    Nombre de collatéraux = nombre de membres du degrés le plus proche + nombre de souche
   //    Nombre de parent survivant
   // 2/ CALCUL
   //    si parent survivant = 1 : 50% + 50% / nombre de collatéraux (ne pas oublier la représentation)
   //    si parent survivant = 2 : 25% + 25% + 50% / nombre de collatéraux (ne pas oublier la représentation)
   //
   const devolution = new Devolution(family)
   return devolution.repartitionParTête(devolution.getMostFavoredMembersByOrdre(), family)
   }

function ordreThreeStrategy(family: Family): Family {
   /*
   1) Deux parents vivants: 50% + 50%
   2) Un parent vivant et 2 grands parents vivants: 50% + 25% + 25%
   3) Un parent vivant et 1 grand aprent vivant : 50% + 50%
   4: Si les deux sont défunts, on divise entre les arrières grands-parents de X (à parts
      égales. Cette fois-ci, on ne distingue plus entre les côtés grand-paternel et
      grand-maternel). Le survivant, s&#39;il existe, recueille le tout. Si il y en a plusieurs, ils
      se divisent la totalité en autant de fraction que de personnes vivantes.
      On remonte jusqu&#39;à trouver quelqu&#39;un de vivant dans les ascendants. S&#39;il y a
      plusieurs personnes au même degré, ils se partagent les 50% de P à parts
      égales. S&#39;il n&#39;y a qu&#39;une seule personne, elle seule récupère les 50% de P.
      2. NON : on remonte aux générations encore au-dessus.
      3. il n&#39;y a personne de vivant parmi les ascendants du
         parent défunt, on attribue au parent encore vivant 100%
         de P.
         1. Y a-t-il des ascendants de X encore en vie (grands-parents,
         arrière-grands-parents ou arrière-arrière-grands-parents ?)
         Proposer de cocher les cases correspondantes, en
         proposant à chaque fois “côté paternel” et “côté maternel”, et
         en proposant de sélectionner le nombre “1” ou “2” pour
         chaque arrière-grand parent maternel et paternel.
         1. OUI

         1. SI ils ne sont présents que d&#39;un côté (paternel ou
         maternel).

         1. SI un ou plusieurs individus de la génération GP
         sont sélectionnés ALORS Ils se répartissent
         l&#39;ensemble de P de X.
         2. SI AUCUN représentant de la génération GP
         sélectionné :
         1. SI un ou plusieurs individus de la génération
         AGP sont sélectionnés ALORS Ils se
         répartissent l&#39;ensemble de P de X.
         2. Sinon. Faire de même pour les AAGP idem
         précédemment
         3. Sinon : revenir à “y a-t-il des ascendants de X
         encore en vie ?”

         2. SI ils sont présents des deux côtés.
         1. Pour les ascendants paternels

         1. SI un ou plusieurs individus de la génération
         GP sont sélectionnés ALORS Ils se
         répartissent 50% de P de X.
         2. SI AUCUN représentant de la génération GP
         sélectionné :
         1. SI un ou plusieurs individus de la génération
         AGP sont sélectionnés ALORS Ils se
         répartissent 50% de P de X.
         2. Sinon. Faire de même pour les AAGP idem
         précédemment
         3. Sinon : revenir à “y a-t-il des ascendants de X
         encore en vie ?”
         2. Pour les ascendants maternels

         1. SI un ou plusieurs individus de la génération
         GP sont sélectionnés ALORS Ils se
         répartissent 50% de P de X.
         2. SI AUCUN représentant de la génération GP
         sélectionné :
         1. SI un ou plusieurs individus de la génération
         AGP sont sélectionnés ALORS Ils se
         répartissent 50% de P de X.
         2. Sinon. Faire de même pour les AAGP idem
         précédemment
         3. Sinon : revenir à “y a-t-il des ascendants de X
         encore en vie ?”
   */

   return family
}

function ordreFourStrategy(family: Family): Family {
   return family
}