import { ValueObject } from '../../../shared/domain/value-objects'
import { Heir, Ordres, Degrees } from '.'

interface FamilyProps {
    value: Heir[]
}

export class Family extends ValueObject<FamilyProps> {

    public static create(heirs: FamilyProps): Family {
        if (heirs === undefined || heirs === null) {
            throw new Error()
        } else {
            return new Family(heirs)
        }
    }

    get value (): Heir[] {
        return this.props.value;
    }

    set value (updatatedHeirs: Heir[]) {
        Object.assign(this.props.value, [...updatatedHeirs].map(heir => Heir.create({value: heir.props.value})))
    }

    findHeir (heir: string) {
        return this.value.find(member => member.member_id === heir)!
    }

     /**
     * Relatives in the most favored class inherit to exclusion of other classes.
     */
    getMostFavoredHeirsByOrdre (): Family {
        return Ordres
            .create(this)
            .getFirstAppliableOrdre()
    }

    /**
     * The nearest relation in a class, determined by counting degrees,
     * inherit to the exclusion of more distant relatives in that class.
     * @param filteredHeirs heirs in the most favored class
     */
    getMostFavoredHeirsByDegre (mostFavoredOrder: Family): Family {
        return Degrees
            .create(this)
            .getFirstAppliableDegree(mostFavoredOrder, this)
    }

}