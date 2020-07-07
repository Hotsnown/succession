import { Family, repartitionParTête, computeRepresentation, assignRepresentation, Ordres } from '../entities'

/**
 * Conditions: 
 * Existence de descendants de X en ligne directe vivants ?(enfants, petits-
 * enfants, arrière-petits-enfants...)
 */
export function ordreOneStrategy(family: Family): Family {
    /*
    1) les personnes du même degré ont la même part.
    2) Si 1 défunt dans le degré privilégié + le défunt a des enfants, les enfants 
       se partagent la part du défunt. Réitérer 1
    */

   const ordre1 = Family.create(Ordres.create(family).props.value[1].concat(family.deCujus))

   const qualification = assignRepresentation(ordre1).debug()

   console.log(qualification.members.filter(member => member.attributes.isReprésenté).map(member => member.member_id))
   
   return qualification.members.some(member => member.isReprésentant)
      ? computeRepresentation(qualification)
      : repartitionParTête(ordre1, family)
 }