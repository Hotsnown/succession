import { Degree, Ordre, Family } from ".";
import { ValueObject } from '../../../shared/domain/value-objects'
import * as R from 'ramda'

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
            legalRights: LegalRights
            spouse: string
            branch: Branch
            //TODO add name
        }
    }
}

export interface MemberConstructor {
    childs: string[];
    member_id: string;
    attributes: MemberAttributes
}

interface MemberAttributes {
        degre: Degree;
        ordre: Ordre;
        status: Status;
        spouse?: string
        legalRights?: LegalRights
        branch?: Branch
        isReprésenté?: Representable
        isReprésentant?: Representant
}

//TODO refactor with immer.js

/**
 * An immutable data class holding a family member's informations
 */
export class Member extends ValueObject<MemberProps> {

    public static create(member: MemberConstructor): Member {
        if (member.childs === undefined || member.childs === null) console.error(member)
        if (R.isNil(member)) console.error(member)
            return new Member(
                {
                    value: {
                        childs: member.childs,
                        member_id: member.member_id,
                        attributes: { 
                            degre: member.attributes.degre,
                            ordre: member.attributes.ordre,
                            status: member.attributes.status,
                            spouse: member.attributes.spouse || '',
                            branch: member.attributes.branch || 'unqualified',
                            isReprésenté: member.attributes.isReprésenté === false || 
                                          member.attributes.isReprésenté ? member.attributes.isReprésenté : 'unqualified',
                            isReprésentant: member.attributes.isReprésentant === false || 
                                            member.attributes.isReprésentant ? member.attributes.isReprésentant : 'unqualified',
                            legalRights: member.attributes.legalRights === 0 || 
                                         member.attributes.legalRights ? member.attributes.legalRights : 'unqualified' 
                                         //0 is evaluated as falsy. Encapsulate it to be more concise with || ??
                        },
                    }
                })
    }



    set legalRights (value: LegalRights) {
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

    get isReprésenté(): Representable {
        return this.props.value.attributes.isReprésenté
    }

    get isReprésentant(): Representant {
        return this.props.value.attributes.isReprésentant
    }

    get legalRights(): LegalRights {
        return this.props.value.attributes.legalRights
    }

    /** Create new immutable member based on an existent one.
     * @argument attributesToUpdate POJO that includes new values that you want to change. 
     * @returns new instance of the same type and with new values.
     */
    public copyWith (attributesToUpdate: { [P in keyof MemberAttributes]?: MemberAttributes[P] }): Member {
        return Member.create(
            Object.assign({}, this.props.value, 
                Object.assign({}, this.props.value.attributes, {attributes: {...this.props.value.attributes, ...attributesToUpdate}})));
    }

    isReprésentéIn(family: Family): Representable {
        const parents = family.findParentsOf(family.deCujus.member_id)
  
        return (this.belongsTo(Ordre.Ordre1) || this.belongsTo(Ordre.Ordre2)) &&
               !this.isIn(parents) &&
               !this.isEligibleToInherit() && 
                this.hasChildEligibleToInheritIn(family)
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

    isReprésentantIn(family: Family): boolean {
        return this.isDescendantOfARepresenté(family) && !this.member_id.startsWith('normal')//&& family.findParentsOf(this.member_id).every(parent => parent.member_id !== family.deCujus.member_id)
    }

    isDescendantOfARepresenté(family: Family): boolean {
        return family.findParentsOf(this.props.value.member_id)
                .filter(member => member !== undefined ? member.isReprésenté : null)
                .length !== 0
    }

    isIn (members: Member[]): boolean {
        return members
                .filter(member => member !== undefined)
                .map(member => member.member_id)
                .includes(this.member_id)
    }
    
    isParentOfDeCujus(family: Family): boolean {
        const parents = family
            .findParentsOf(family.deCujus.member_id)
            .filter(parent => parent.isEligibleToInherit())
  
        return parents
           .map(parent => parent.member_id)
           .includes(this.member_id)
     }
}

export type Branch = 'paternelle' | 'maternelle' | 'unqualified';
export type Representable = boolean | 'unqualified';
export type Representant = boolean | 'unqualified';
export type LegalRights = number | 'unqualified';