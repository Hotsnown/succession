import { ValueObject } from '../../../shared/domain/value-objects'
import { Heir } from '.'
import * as R from 'ramda'
import { Family } from './Family'

interface DegreesProps {
    value: Record<string, Heir[]>
}

/**
 * @desc In each class, the nearest relation in a class, determined by counting degrees, 
 * inherit to the exclusion of more distant relatives in that class.
 */
export class Degrees extends ValueObject<DegreesProps> {

    public static create(heirs: Family): Degrees {
        if (heirs === undefined || heirs === null || heirs.value.length < 0) {
            throw new Error()
        } else {
            return new Degrees({ value: byDegre(heirs.value) })
        }
    }

    get value() {
        return this.props.value;
    }

    get firstAppliableDegree() {
        for (const degre of degrees) {
            if (this.value[degre] !== undefined) {
                return degre
            }
        }
        return 4 //TODO Better Error Handling
    }

    getFirstAppliableDegree(filteredHeirs: Family, allHeirs: Family) {

        const appliableDegree = byDegre(filteredHeirs.value)[this.firstAppliableDegree]

        if (appliableDegree !== undefined) {
            for (const heir of appliableDegree) {
                heir.legalRights = 1 / appliableDegree.length
                //default value is 0
            }
        }

        return allHeirs
    }
}

const byDegre = R.groupBy(function (heir: Heir) {
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