import { Heir, Solution, Ordres, Degrees } from '../../entities'
import { assignLegalRights } from '../utils'
import * as R from 'ramda'

/**
 * When the de cujus dies without a spouse.
 */
export function repartitionParTête(allHeirs: Heir[]): Solution[] {
    
    /**
     * Relatives in the most favored class inherit to exclusion of other classes.
     */
    function getFirstAppliableOrdre(): Heir[] {
        return Ordres
                .create(allHeirs)
                .getFirstAppliableOrdre()
    }
    
    /**
     * The nearest relation in a class, determined by counting degrees,
     * inherit to the exclusion of more distant relatives in that class.
     * @param filteredHeirs heirs in the most favored class
     */
    function getFirstAppliableDegree(filteredHeirs: Heir[]) {
        return Degrees
                .create(allHeirs)
                .getFirstAppliableDegree(filteredHeirs, allHeirs)
    }

    const getResult = R.pipe(
        getFirstAppliableOrdre,
        getFirstAppliableDegree,
        )()

    if (getResult !== undefined) {
        return getResult
    } else {
        return allHeirs.map(r => assignLegalRights(r, 0))
    }
}