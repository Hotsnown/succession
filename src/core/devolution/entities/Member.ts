/* prettier-ignore */
/*eslint-disable*/

import { Family, LegalRight, Ordre, ExtendedOrdre, ExtendedDegree } from "../entities";
import { Entity } from "../../shared/domain/entities";

import * as R from 'ramda'

export enum Status {
    Deceased,
    Indigne,
    Renonçant,
    Valid
}

interface MemberProps {
    value: MemberConstructor
}

export interface MemberConstructor {
    childs: string[];
    member_id: string;
    attributes: MemberAttributes
}

interface MemberAttributes {
        degre: ExtendedDegree | 'unassigned';
        ordre: ExtendedOrdre | 'unassigned';
        status: Status;
        spouse: Spouse
        legalRights: LegalRight | 'unassigned';
        branch: Branch | 'unassigned';
        isReprésenté: Représenté | 'unassigned';
        isReprésentant: Representant | 'unassigned';
        index: number | 'unassigned';
}

export type Branch = 'paternelle' | 'maternelle';
export type Représenté = boolean;
export type Representant = boolean;
export type Spouse = string[] | 'without spouse' ;
//TODO refactor with immer.js

/**
 * An immutable data class holding a family member's informations
 */
export class Member extends Entity<MemberProps> {

    public static create(member: MemberConstructor): Member {
        if (member.childs === undefined || member.childs === null) console.error(member)
        if (R.isNil(member)) console.error(member)
        if (member.attributes.status === undefined) console.error(`Error: ${member.member_id}'s status is ${member.attributes.status} wherehas it should be 'valid' | 'invalid'`)
        return new Member(
                {
                    value: {
                        childs: member.childs,
                        member_id: member.member_id,
                        attributes: { 
                            degre: member.attributes.degre,
                            ordre: member.attributes.ordre,
                            status: member.attributes.status,
                            spouse: member.attributes.spouse,
                            branch: member.attributes.branch,
                            isReprésenté: member.attributes.isReprésenté,
                            isReprésentant: member.attributes.isReprésentant,
                            legalRights: member.attributes.legalRights,
                            index: member.attributes.index
                        },
                    }
                })
    }
    
    get childs(): string[] {
        return this.props.value.childs;
    }

    get member_id(): string {
        return this.props.value.member_id
    }

    get index(): number {
        if (this.props.value.attributes.index === 'unassigned') console.error('Member\'s index is not set.')
        return this.props.value.attributes.index as number
    }

    get attributes() {
        return this.props.value.attributes
    }

    get isReprésenté(): Représenté | 'unassigned' {
        return this.props.value.attributes.isReprésenté
    }

    get isReprésentant(): Representant | 'unassigned' {
        return this.props.value.attributes.isReprésentant
    }

    get legalRights(): LegalRight | 'unassigned' {
        return this.props.value.attributes.legalRights
    }

    /** Create new immutable member based on an existent one.
     * @argument attributesToUpdate POJO that includes new values that you want to change. 
     * @returns new instance of the same type and with new values.
     */
    public copyWith (attributesToUpdate: { [A in keyof MemberAttributes]?: MemberAttributes[A] }): Member {
        return Member.create(
            Object.assign({}, this.props.value, 
                Object.assign({}, this.props.value.attributes, {attributes: {...this.props.value.attributes, ...attributesToUpdate}})));
    }

    public belongsTo(ordre: Ordre): boolean {
        return this.attributes.ordre === ordre
    }

    public isEligibleToInherit(): boolean {
        return this.attributes.status === Status.Valid
    }

    public hasChildEligibleToInheritIn(family: Family): boolean {
        //TODO: it should work if child of child is eligible to inherit
        return family.members
            .filter(member => this.childs.includes(member.member_id))
            .some(child => child.isEligibleToInherit())
    }

    public hasSiblingEligibleToInheritIn(family: Family): boolean {
        return family.members
            .filter(member => member.attributes.ordre === 2 && member.attributes.degre === 2)
            .some(sibling => sibling.isEligibleToInherit())
    }

    public isNotSiblingOfDeCujus(family: Family) {
        const parents = family.findParentsOf(family.deCujus.member_id);
        const siblingOfDeCujus = parents
            .filter(parent => parent !== undefined)
            .flatMap(parent => parent.childs)
            .map(parent => family.findMember(parent)); //bug: includes deCujus
        let isNotSiblingOfDecujus: boolean;
        if (siblingOfDeCujus.every(member => typeof member !== undefined)) {
            isNotSiblingOfDecujus = !this.isIn(siblingOfDeCujus as Member[]);
        }
        else {
            isNotSiblingOfDecujus = false;
        }
        return isNotSiblingOfDecujus;
    }

    public isDescendantOfARepresenté(family: Family): boolean {
        return family.findParentsOf(this.member_id)
            .filter(parent => parent !== undefined)
            .some(parent => parent.isReprésenté === true)
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
            .filter(parent => parent !== undefined && parent.isEligibleToInherit())
  
        return parents
           .map(parent => parent.member_id)
           .includes(this.member_id)
     }
}