import { Degree, Ordre, Family } from ".";
import { ValueObject } from '../../shared/domain/value-objects'
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
            isReprésenté: Représenté
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
        isReprésenté?: Représenté
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
        if (member.attributes.status === undefined) console.error(`Error: ${member.member_id}'s status is ${member.attributes.status} wherehas it should be 'valid' | 'invalid'`)
        if (member.attributes.legalRights && member.attributes.legalRights > 1) throw new Error(`${member.member_id}'s legalRights are over 100%: ${member.attributes.legalRights}`)    
        return new Member(
                {
                    value: {
                        childs: member.childs,
                        member_id: member.member_id,
                        attributes: { 
                            degre: member.attributes.degre,
                            ordre: member.attributes.ordre,
                            //@ts-ignore
                            status: (member.attributes.status === Status.Valid || Status.Deceased) 
                                ? member.attributes.status
                                //@ts-ignore
                                : (member.attributes.status === 'valid') 
                                    ? Status.Valid
                                    : Status.Deceased,
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

    get isReprésenté(): Représenté {
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

    public isReprésentéIn(family: Family): Représenté {
        const parents = family.findParentsOf(family.deCujus.member_id)
  
        return (this.belongsTo(Ordre.Ordre1) || this.belongsTo(Ordre.Ordre2)) &&
                (family.deCujus.hasChildEligibleToInheritIn(family) || family.deCujus.hasSiblingEligibleToInheritIn(family))&&
               !this.isIn(parents) &&
               !this.isEligibleToInherit() && 
                this.hasChildEligibleToInheritIn(family)
    }

    public belongsTo(ordre: Ordre): boolean {
        return this.attributes.ordre === ordre
    }

    public isEligibleToInherit(): boolean {
        return this.attributes.status === Status.Valid
    }

    private hasChildEligibleToInheritIn(family: Family): boolean {
        return family.members
            .filter(member => this.childs.includes(member.member_id))
            .some(child => child.isEligibleToInherit())
    }

    private hasSiblingEligibleToInheritIn(family: Family): boolean {
        return family.members
            .filter(member => member.attributes.ordre === 2 && member.attributes.degre === 2)
            .some(sibling => sibling.isEligibleToInherit())
    }

    public isReprésentantIn(family: Family): boolean {
        return this.isDescendantOfARepresenté(family) && //isNotParentOfDeCujus
            this.isNotSiblingOfDeCujus(family) &&
            this.member_id !== family.deCujus.member_id
    }

    private isNotSiblingOfDeCujus(family: Family) {
        const parents = family.findParentsOf(family.deCujus.member_id);
        const siblingOfDeCujus = parents
            .filter(parent => parent !== undefined)
            .flatMap(parent => parent.childs)
            .map(parent => family.findMember(parent)); //bug: includes deCujus
        let isNotSiblingOfDecujus: boolean;
        if (siblingOfDeCujus.every(member => typeof member !== undefined)) {
            //@ts-ignore 
            isNotSiblingOfDecujus = !this.isIn(siblingOfDeCujus); //TODO learn to narrow out undefined items in array
        }
        else {
            isNotSiblingOfDecujus = false;
        }
        return isNotSiblingOfDecujus;
    }

    private isDescendantOfARepresenté(family: Family): boolean {
        return family.findParentsOf(this.member_id)
            .filter(parent => parent !== undefined)
            .some(parent => parent.isReprésenté)
    }

    public isIn (members: Member[]): boolean {
        return members
                .filter(member => member !== undefined)
                .map(member => member.member_id)
                .includes(this.member_id)
    }
    
    public isParentOfDeCujus(family: Family): boolean {
        const parents = family
            .findParentsOf(family.deCujus.member_id)
            .filter(parent => parent.isEligibleToInherit())
  
        return parents
           .map(parent => parent.member_id)
           .includes(this.member_id)
     }
}

export type Branch = 'paternelle' | 'maternelle' | 'unqualified';
export type Représenté = boolean | 'unqualified';
export type Representant = boolean | 'unqualified';
export type LegalRights = number | 'unqualified';