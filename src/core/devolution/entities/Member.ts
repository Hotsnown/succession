import { Degree, Ordre, Family } from ".";
import { ValueObject } from '../../../shared/domain/value-objects'
import { findParents } from '../useCases/utils'

export enum Status {
    Deceased,
    Indigne,
    Renonçant,
    Valid
}

interface MemberProps {
    value: {
        childs: string[];
        member_id: string; //TODO uplift to entity id
        attributes: {
            degre: Degree;
            ordre: Ordre;
            status: Status;
            isReprésenté: Representable
            isReprésentant: Representant
            legalRights: number
            spouse: string
            branch: 'paternelle' | 'maternelle' | 'unknown'
            //TODO add name
        }
    }
}

interface MemberConstructor {
    childs: string[];
    member_id: string;
    attributes: { 
        degre: Degree;
        ordre: Ordre;
        status: Status;
        spouse?: string
    }
}
export class Member extends ValueObject<MemberProps> {

    public static create(member: MemberConstructor): Member {
        if (member.childs === undefined || member.childs === null) {
            console.error(member)
            throw new Error()
        } else {
            return new Member(
                {
                    value: {
                        childs: member.childs,
                        member_id: member.member_id,
                        attributes: { 
                            degre: member.attributes.degre,
                            ordre: member.attributes.ordre,
                            status: member.attributes.status,
                            spouse: member.attributes.spouse || '', //TODO fault tolerance
                            branch: 'unknown',
                            isReprésenté: false,
                            isReprésentant: false,
                            legalRights: 0,
                        },
                    }
                })
        }
    }

    set isReprésenté (value: boolean) {
        this.props.value.attributes.isReprésenté = value
    }

    set isReprésentant (value: boolean) {
        this.props.value.attributes.isReprésentant = value
    }

    set legalRights (value: number) {
        this.props.value.attributes.legalRights = value
    }

    get childs(): string[] {
        return this.props.value.childs;
    }

    get member_id(): string {
        return this.props.value.member_id
    }

    get attributes() {
        return this.props.value.attributes
    }

    get isReprésenté() {
        return this.props.value.attributes.isReprésenté
    }

    get isReprésentant() {
        return this.props.value.attributes.isReprésentant
    }

    get legalRights() {
        return this.props.value.attributes.legalRights
    }

    isReprésentableIn(members: Family): Representable {
        return (this.belongsTo(Ordre.Ordre1) || this.belongsTo(Ordre.Ordre2)) && 
               !this.isEligibleToInherit() && 
                this.hasChildEligibleToInheritIn(members)
    }

    belongsTo(ordre: Ordre): boolean {
        return this.attributes.ordre === ordre
    }

    isEligibleToInherit(): boolean {
        return this.attributes.status === Status.Valid
    }

    hasChildEligibleToInheritIn(family: Family): boolean {
        return family.members
            .filter(member => 
                this.childs.includes(member.member_id) && 
                member.isEligibleToInherit())
                .length !== 0
    }

    isRepresentativeIn(members: Family) {
        return this.isDescendantOfARepresenté(members) && this.isEligibleToInherit()
    }

    isDescendantOfARepresenté(members: Family) {
        return findParents(members, this.props.value.member_id)
                .filter(member => member !== undefined ? member.isReprésenté : null)
                .length !== 0
    }
    
}

type Representable = boolean
type Representant = boolean