import { ValueObject } from '../../../shared/domain/value-objects'
import { Solution, Heir, LegalRights } from '.'
import * as R from 'ramda'

interface DegreesProps {
    value: HeirsGroupedByDegrees
}

interface HeirsGroupedByDegrees {
    1 : Heir[]
    2 : Heir[]
    3 : Heir[]
    4 : Heir[]
    unknown: Heir[]
}

/**
 * @desc In each class, the nearest relation in a class, determined by counting degrees, 
 * inherit to the exclusion of more distant relatives in that class.
 */
export class Degrees extends ValueObject<DegreesProps> {

    public static create(heirs: Heir[]): Degrees {
        if (heirs === undefined || heirs === null || heirs.length < 0) {
            throw new Error()
        } else {
            //@ts-ignore
            return new Degrees({ value: byDegre(heirs)})
        }
    }

    get value() {
        return this.props.value;
    }

    getFirstAppliableDegree(filteredHeirs:Heir[], allHeirs: Heir[]) {
        for (const degre of degrees) {
            if (byDegre(filteredHeirs)[degre] !== undefined) {
                return allHeirs
                        .filter(fact => fact.data.degre !== degre).map(r => assignLegalRights(r, 0))
                        .concat(byDegre(filteredHeirs)[degre].map(r => assignLegalRights(r, 1 / byDegre(filteredHeirs)[degre].length)))
            }
        }
    }
}

const byDegre = R.groupBy(function(heir: Heir) {
    const degre = heir.data.degre
    return degre === 1 ? '1' :
           degre === 2 ? '2' :
           degre === 3 ? '3' :
           degre === 4 ? '4' :
           degre === 5 ? '5' :
           degre === 6 ? '6' : 'unknown'
})

export enum Degree {
    Degree1 = 1,
    Degree2 = 2,
    Degree3 = 3,
    Degree4 = 4,
    Degree5 = 5,
    Degree6 = 6
}

const degrees = [Degree.Degree1, Degree.Degree2, Degree.Degree3, Degree.Degree4, Degree.Degree5, Degree.Degree6]

const assignLegalRights = (heir: Heir, legalRights: number): Solution => ({ ...heir, legalRights: LegalRights.create(legalRights) });