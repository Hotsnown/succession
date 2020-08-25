/* prettier-ignore */
/*eslint-disable*/

import { Family, Member, LegalRight, Degree } from "../../entities";
import { repartitionParTête, computeRepresentation } from '../inference'
import { assignRepresentation } from "../qualification/Représentation";
 
/**
 * Si le défunt laisse des enfants issus d'une précédente union, 
 * l'époux survivant hérite du quart de la succession en pleine propriété. 
 * Dans ce cas, les enfants héritent des 3/4 de la succession, 
 * réparti à parts égales, sous réserve de la représentation 
 */
export function withDescendants (family: Family, spouse: Member, deCujus: Member): Family {
    //TODO : qualification du conjoint survivant
    //TODO : enfants avec plusieurs partenaires
    //TODO : représentation

    const cleanFamily = assignRepresentation(Family.create(family.members.filter(member => member !== undefined), family.deCujus.member_id))
    const childs = cleanFamily.members.filter(withoutDeCujusChilds(family))
    const others = cleanFamily.members.filter(withDeCujusChilds(family)).filter(without(spouse))
    
    const computedChilds = childs.some(member => member.isReprésentant) 
        ? computeRepresentation(Family.create(childs, family.deCujus.member_id), Degree.Degree1, LegalRight.percent('75%')).members
        : repartitionParTête(Family.create(childs, family.deCujus.member_id), family, LegalRight.percent('75%')).members

    return Family.create(
        [
            spouse.copyWith({legalRights: LegalRight.percent('25%')}),
            ...computedChilds,
            ...others.map(noLegalRights())
        ],
        family.deCujus.member_id
    )
}

export function withoutDescendants (family: Family, spouse: Member): Family {
    return Family.create(
        [
            spouse.copyWith({ legalRights: LegalRight.percent('100%')}),
            ...family.members
                     .filter(without(spouse))
                     .map(noLegalRights())
        ],
        family.deCujus.member_id
    )
}

function without(memberToOmit: Member) {
    return member => member.member_id !== memberToOmit.member_id;
}

function withDeCujusChilds(family: Family) {
    return member => !family.deCujus.childs.includes(member.member_id);
}

function withoutDeCujusChilds(family: Family) {
    return member => family.deCujus.childs.includes(member.member_id);
}

function noLegalRights(): (value: Member, index: number, array: Member[]) => Member {
    return member => member.copyWith({ legalRights: LegalRight.percent('0%') });
}