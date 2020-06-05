import { Family } from '../../entities'
/**
 * When the de cujus dies without a spouse.
 */
export function repartitionParTête(allHeirs: Family): Family {
   const m = allHeirs
            .getMostFavoredHeirsByOrdre()
    return allHeirs.getMostFavoredHeirsByDegre(m) //Faire un builder ?
}