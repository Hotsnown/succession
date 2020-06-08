import { Family } from '../../entities'
/**
 * When the de cujus dies without a spouse.
 */
export function repartitionParTête(allMembers: Family): Family {
   return allMembers.getMostFavoredMembersByDegre(allMembers.getMostFavoredMembersByOrdre())
}