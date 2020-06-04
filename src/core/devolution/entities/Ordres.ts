import { ValueObject } from '../../../shared/domain/value-objects'
import { Heir } from '.';
import * as R from 'ramda'

interface OrdreProps {
    value: HeirsGroupedByOrdre
}

/**
 * @desc Heirs are divided into four classes where each classe exclude other classes.
 *  If there are no heirs in one class, the property goes to all the heirs in the next class.
 */
export class Ordres extends ValueObject<OrdreProps> {

    public static create(heirs: Heir[]): Ordres {
        if (heirs === undefined || heirs === null || heirs.length < 0) {
            throw new Error()
        } else {
            //@ts-ignore
            return new Ordres({ value: byOrdre(heirs) })
        }
    }

    get value() {
        return this.props.value;
    }

    getFirstAppliableOrdre(): Heir[] {
        for (const ordre in ordres) {
            //@ts-ignore
            if (this.props.value[ordre] !== undefined) {
                //@ts-ignore
                return this.props.value[ordre]
            }
        }
        return [] //TODO Error handling
    }
}

const byOrdre = R.groupBy(function(heir: Heir) {
    const ordre = heir.data.ordre
    return  ordre === 1 ? '1' :
            ordre === 2 ? '2' :
            ordre === 3 ? '3' :
            ordre === 4 ? '4' : 'unknown'
    })

export enum Ordre {
    Ordre1 = 1, 
    Ordre2,
    Ordre3,
    Ordre4
}

const ordres = [Ordre.Ordre1, Ordre.Ordre2, Ordre.Ordre3, Ordre.Ordre4]

interface HeirsGroupedByOrdre {
    1 : Heir[]
    2 : Heir[]
    3 : Heir[]
    4 : Heir[]
    unknown: Heir[]
}