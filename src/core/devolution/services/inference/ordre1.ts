/* prettier-ignore */
/*eslint-disable*/

import { Family, Refine } from '../../entities'
import { repartitionParTête, répartitionParSouche } from '../inference'
import { assignRepresentation } from '../qualification/Représentation'
import { byOrdre } from './utils/Ordres'

/**
1. les personnes du même degré ont la même part.
2. Si 1 défunt dans le degré privilégié + le défunt a des enfants, les enfants 
   se partagent la part du défunt. Réitérer 1
*/
export const ordreOneStrategy: Refine = (family) => {

   const ordre1 = Family.create(byOrdre(family.members)[1].concat(family.deCujus), family.deCujus.member_id)

   const qualification = assignRepresentation(ordre1)
   
   return qualification.members.some(member => member.isReprésentant)
      ? répartitionParSouche(qualification)
      : repartitionParTête(ordre1, family)
 }