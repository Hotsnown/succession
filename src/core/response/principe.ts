/* En principe, à l'intérieur d'un même ordre successoral, les héritiers proches
et de même degré se répartissent le bénéfice de la succession à égale
portion et par tête. */

import { QualifiedFact, Solution, Ordres, Degrees } from './IResponse'
import * as R from 'ramda'

const ordres = [Ordres.Ordre1, Ordres.Ordre2, Ordres.Ordre3, Ordres.Ordre4]
const degrees = [Degrees.Degree1, Degrees.Degree2, Degrees.Degree3, Degrees.Degree4, Degrees.Degree5, Degrees.Degree6]

export function repartitionParTête(allHeirs: QualifiedFact[]): Solution[] {
    
    function getFirstAppliableOrdre() {
        const byOrdre = R.groupBy(function(heir: QualifiedFact) {
            const ordre = heir.data.ordre
            return ordre === 1 ? '1' :
                   ordre === 2 ? '2' :
                   ordre === 3 ? '3' :
                   ordre === 4 ? '4' : 'unknown'
        })
    
        for (const ordre in ordres) {
            if (byOrdre(allHeirs)[ordre] !== undefined) {
                return byOrdre(allHeirs)[ordre]
            }
        }
        return allHeirs //TODO error handling
    }
    
    function getFirstAppliableDegre(filteredHeirs: QualifiedFact[]) {
        const byDegre = R.groupBy(function(heir: QualifiedFact) {
            const degre = heir.data.degre
            return degre === 1 ? '1' :
                   degre === 2 ? '2' :
                   degre === 3 ? '3' :
                   degre === 4 ? '4' :
                   degre === 5 ? '5' :
                   degre === 6 ? '6' : 'unknown'
        })

        for (const degre of degrees) {
            if (byDegre(filteredHeirs)[degre] !== undefined) {
                return allHeirs
                        .filter(fact => fact.data.degre !== degre).map(r => assignLegalRights(r, 0))
                        .concat(byDegre(filteredHeirs)[degre].map(r => assignLegalRights(r, 1 / byDegre(filteredHeirs)[degre].length)))
            }
        }
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

/*     for (const ordre of ordres) {
        const sameOrdreHeirs = allHeirs.filter(fact => fact.data.ordre === ordre)
        if (sameOrdreHeirs.length) {
            for (const degree of degrees) {
                const sameDegreesHeirs = allHeirs.filter(fact => fact.data.degre === degree)
                if (sameDegreesHeirs.length) {
                    return allHeirs
                        .filter(fact => fact.data.degre !== degree).map(r => assignLegalRights(r, 0))
                        .concat(sameDegreesHeirs.map(r => assignLegalRights(r, 1 / sameDegreesHeirs.length)))
                }
            }
        }
    } return allHeirs.map(
        r => assignLegalRights(r, 0)
    ) */
} 

export function findHeir(solutions: Solution[], heir: string): Solution {
    return solutions.find(member => member.member_id === heir)!
}

const assignLegalRights = (qualifiedFact: QualifiedFact, legalRights: number): Solution => ({ ...qualifiedFact, legalRights: legalRights });