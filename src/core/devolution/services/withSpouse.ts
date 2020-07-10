import { Family, Member } from "../entities";

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
    //TODO : exclure les enfants incapable d'hériter
    return Family.create(family.members
        .filter(member => member !== undefined)
        .map(member =>
            family.deCujus.childs.includes(member.member_id)
                ? member.copyWith({legalRights: 3 / deCujus.childs.length / 4}) 
                : member.member_id === spouse.member_id 
                    ? member.copyWith({legalRights: 1/4})
                    : member.copyWith({legalRights: 0})))
}

export function withoutDescendants (family: Family, spouse: Member): Family {
    return Family.create(family.members
        .filter(member => member !== undefined)
        .map(member => member.member_id === spouse.member_id 
            ? member.copyWith({legalRights: 1}) 
            : member.copyWith({legalRights: 0})
        ))
}

