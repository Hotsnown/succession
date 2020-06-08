import { ValueObject } from '../../../shared/domain/value-objects'
import { Member } from '.'
import * as R from 'ramda'
import { Family } from './Family'

interface DegreesProps {
    value: Record<string, Member[]>
    degrees: Degree[]
}

export enum Degree {
    Degree1 = 1,
    Degree2 = 2,
    Degree3 = 3,
    Degree4 = 4,
    Degree5 = 5,
    Degree6 = 6
}

/**
 * In each class, the nearest relation in a class, determined by counting degrees, 
 * inherit to the exclusion of more distant members in that class.
 */
export class Degrees extends ValueObject<DegreesProps> {

    public static create(heirs: Family): Degrees {
        if (heirs === undefined || heirs === null || heirs.members.length < 0) {
            throw new Error()
        } else {
            return new Degrees({ 
                value: byDegre(heirs.members),
                degrees: [Degree.Degree1, Degree.Degree2, Degree.Degree3, Degree.Degree4, Degree.Degree5, Degree.Degree6],
            })
        }
    }

    get value () {
        return this.props.value;
    }

    get firstAppliableDegree() {
        for (const degre of this.props.degrees) {
            if (this.value[degre] !== undefined) {
                return degre
            }
        }
        return Degree.Degree6 //TODO Better Error Handling
    }

    getFirstAppliableDegree(filteredMembers: Family, allMembers: Family) {

        const appliableDegree = Degrees
                    .create(filteredMembers)
                    .value[this.firstAppliableDegree]

        if (appliableDegree !== undefined) {           
            appliableDegree.forEach(
                heir => heir.legalRights = 1 / appliableDegree.length) //default value is 0
        }

        return allMembers
    }
}

const byDegre = R.groupBy(function (heir: Member) {
    const degre = heir.attributes.degre
    return degre === 1 ? '1' :
           degre === 2 ? '2' :
           degre === 3 ? '3' :
           degre === 4 ? '4' :
           degre === 5 ? '5' :
           degre === 6 ? '6' : 'unknown' 
})