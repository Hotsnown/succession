import { Heir, Solution, Ordres, LegalRights, Degrees } from '../entities'
import * as R from 'ramda'

/**
 * @desc En principe, à l'intérieur d'un même ordre successoral, les héritiers proches
 *  et de même degré se répartissent le bénéfice de la succession à égale
 * portion et par tête. 
 */
export function repartitionParTête(allHeirs: Heir[]): Solution[] {
    
    function getFirstAppliableOrdre(): Heir[] {
        return Ordres
                .create(allHeirs)
                .getFirstAppliableOrdre()
    }
    
    function getFirstAppliableDegre(filteredHeirs: Heir[]) {
        return Degrees
                .create(allHeirs)
                .getFirstAppliableDegree(filteredHeirs, allHeirs)
    }

    const result = R.pipe(
                    getFirstAppliableOrdre,
                    getFirstAppliableDegre,
                    )

    const getResult = result()

    if (getResult !== undefined) {
        return getResult
    } else {
        return allHeirs.map(r => assignLegalRights(r, 0))
    }
}

const assignLegalRights = (Heir: Heir, legalRights: number): Solution => ({ ...Heir, legalRights: LegalRights.create(legalRights) });