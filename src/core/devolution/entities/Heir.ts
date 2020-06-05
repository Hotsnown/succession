import { Degree, Ordre, Solution, Family } from ".";
import { ValueObject } from '../../../shared/domain/value-objects'
import { findParents } from '../useCases/utils'

export enum Status {
    Deceased,
    Indigne,
    Renonçant,
    Valid
}

interface HeirProps {
    value: {
        childs: string[];
        member_id: string; //TODO uplift to entity id
        data: { //change to 'attributes'
            degre: Degree;
            ordre: Ordre;
            status: Status;
            //TODO add name
        }
        isReprésenté: boolean
        isReprésentant: boolean
    }
}

export class Heir extends ValueObject<HeirProps> {

    public static create({value}: HeirProps): Heir {
        if (value.childs === undefined || value.childs === null) {
            console.error(value)
            throw new Error()
        } else {
            return new Heir({value})
        }
    }

    set isReprésenté (value: boolean) {
        this.props.value.isReprésenté = value
    }

    set isReprésentant (value: boolean) {
        this.props.value.isReprésentant = value
    }

    get childs(): string[] {
        return this.props.value.childs;
    }

    get member_id(): string {
        return this.props.value.member_id
    }

    get data() {
        return this.props.value.data
    }

    get isReprésenté() {
        return this.props.value.isReprésenté
    }

    get isReprésentant() {
        return this.props.value.isReprésentant
    }

    belongsTo(ordre: Ordre) {
        return this.data.ordre === ordre
    }

    isEligibleToInherit(): boolean {
        return this.data.status === Status.Valid
    }

    hasChildEligibleToInheritIn(heirs: Family) {
        return heirs.value.filter(heir => this.childs.includes(heir.member_id))
                          .find(heir => heir.isEligibleToInherit())
    }

    isDescendantOfARepresenté(heirs: Family) {
        return findParents(heirs, this.props.value.member_id)
                .find(heir => heir !== undefined ? heir.isReprésenté : null)
    }
}

export function findHeir(solutions: Solution[], heir: string): Solution {
    return solutions.find(member => member.member_id === heir)!
}