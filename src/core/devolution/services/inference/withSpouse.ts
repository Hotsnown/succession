import { Family, Member, LegalRight, Degree } from "../../entities";
import { repartitionParTête } from '.'
import { computeRepresentation } from "./Représentation";
import { assignRepresentation } from "../qualification/Représentation";
 /**
 * Si le défunt laisse des enfants issus d'une précédente union, 
 * l'époux survivant hérite du quart de la succession en pleine propriété. 
 * Dans ce cas, les enfants héritent des 3/4 de la succession, 
 * réparti à parts égales, sous réserve de la représentation 
 */
export function withDescendants (family: Family, spouse: Member, deCujus: Member): Family {
    //TODO : qualification du conjoint survivant
    //TODO : option du conjoint
    //TODO : enfants avec plusieurs partenaires
    //TODO : représentation

    const cleanFamily = assignRepresentation(family.filter(member => member !== undefined))
    const childs = cleanFamily.members.filter(member => family.deCujus.childs.includes(member.member_id))
    const others = cleanFamily.members.filter(member => !family.deCujus.childs.includes(member.member_id) && member.member_id !== spouse.member_id)
    
    const computedChilds = cleanFamily.members.some(member => member.isReprésentant)
        ? computeRepresentation(Family.create(childs.concat(cleanFamily.findMember('deceasedChild') as Member)), Degree.Degree1, LegalRight.percent('75%')).members
        : repartitionParTête(Family.create(childs), family, LegalRight.percent('75%')).members

    return Family.create(
        [
            spouse.copyWith({legalRights: LegalRight.percent('25%')}),
            ...computedChilds,
            ...others.map(member => member.copyWith({ legalRights: LegalRight.percent('0%') }))
        ])
}

export function withoutDescendants (family: Family, spouse: Member): Family {
    return family
        .filter(member => member !== undefined)
        .map(member => member.member_id === spouse.member_id 
            ? member.copyWith({ legalRights: LegalRight.percent('100%') }) 
            : member.copyWith({ legalRights: LegalRight.percent('0%') })
        )
}

