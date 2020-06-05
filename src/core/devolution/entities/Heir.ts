import { Degree, Ordre, Family } from ".";
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
        isReprésenté: Representable
        isReprésentant: Representant
        legalRights: number
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

    set legalRights (value: number) {
        this.props.value.legalRights = value
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

    get legalRights() {
        return this.props.value.legalRights
    }

    belongsTo(ordre: Ordre): boolean {
        return this.data.ordre === ordre
    }

    isEligibleToInherit(): boolean {
        return this.data.status === Status.Valid
    }

    hasChildEligibleToInheritIn(heirs: Family): boolean {
        return heirs.value
            .filter(heir => 
                this.childs.includes(heir.member_id) && 
                heir.isEligibleToInherit())
                .length !== 0
    }

    isDescendantOfARepresenté(heirs: Family) {
        return findParents(heirs, this.props.value.member_id)
                .find(heir => heir !== undefined ? heir.isReprésenté : null)
    }

    isReprésentable(heirs: Family): Representable {
        return (this.belongsTo(Ordre.Ordre1) || this.belongsTo(Ordre.Ordre2)) && 
               !this.isEligibleToInherit() && 
                this.hasChildEligibleToInheritIn(heirs)
    }
}

type Representable = boolean
type Representant = boolean