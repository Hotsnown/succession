import { ValueObject } from '../../../shared/domain/value-objects'
import { Heir } from '.';
import * as R from 'ramda'
import { Family } from './Family';

interface OrdreProps {
    value: Record<string, Heir[]>
}

/**
 * @desc Heirs are divided into four classes where each classe exclude other classes.
 *  If there are no heirs in one class, the property goes to all the heirs in the next class.
 */
export class Ordres extends ValueObject<OrdreProps> {

    public static create(heirs: Family): Ordres {
        if (heirs === undefined || heirs === null || heirs.value.length < 0) {
            throw new Error()
        } else {
            return new Ordres({ value: byOrdre(heirs.value) })
        }
    }

    get value() {
        return this.props.value;
    }

    getFirstAppliableOrdre(): Family {
        for (const ordre in ordres) {
            if (this.props.value[ordre] !== undefined) {
                return Family.create({value: this.props.value[ordre]})
            }
        }
        return Family.create({value: []}) //TODO Error handling
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