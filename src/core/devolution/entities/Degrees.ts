import { ValueObject } from '../../shared/domain/value-objects'
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

    public static create(family: Family): Degrees {
        if (family === undefined || family === null || family.members.length < 0) throw new Error()
        if (family.members.some(member => member === undefined)) throw new Error()

        return new Degrees(
            { 
                value: byDegre(family.members),
                degrees: [Degree.Degree1, Degree.Degree2, Degree.Degree3, Degree.Degree4, Degree.Degree5, Degree.Degree6],
            })
    }

    get value () {
        return this.props.value;
    }

    static get degrees() {
        return [Degree.Degree1, Degree.Degree2, Degree.Degree3, Degree.Degree4, Degree.Degree5, Degree.Degree6]
    }

    get firstAppliableDegree() {
        for (const degre in this.props.degrees) {
            if (this.value[degre] !== undefined) {
                if(this.atLeastOneMemberEligibleToInheritIn(degre)) {
                    return degre
                }
            }
        }
        return Degree.Degree6 //TODO Better Error Handling
    }

    private atLeastOneMemberEligibleToInheritIn(degre: string) {
        return this.props.value[degre].some(member => member.isEligibleToInherit());
    }

    static getMembersOfDegre(querriedDegree: Degree, family: Family): Family {
        return Family.create(Degrees
                .create(family)
                .value[querriedDegree])
    }

    public getFirstAppliableDegreeMembers(filteredMembers: Family, family: Family): Member[] {
        return Degrees
                .create(filteredMembers)
                .value[this.firstAppliableDegree]
    }
}

const byDegre = R.groupBy(function (member: Member) {
    const degre = member.attributes.degre
    return degre === 0 ? 'deCujus' :
           degre === 1 ? '1' :
           degre === 2 ? '2' :
           degre === 3 ? '3' :
           degre === 4 ? '4' :
           degre === 5 ? '5' :
           degre === 6 ? '6' : 'unknown' 
})