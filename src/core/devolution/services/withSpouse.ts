import { Family } from "../entities";

export function withSpouseController(family: Family): Family {

    try {
        withSpouse(family)
    } catch(e) {
        console.error(e)
        family.debug()
        return family
    }

    return withSpouse(family)

    function withSpouse(family: Family): Family {
        const deCujus = family.deCujus
        const spouse = family.findSpouseOf(deCujus.member_id)!
        
        /**
         * the deceased died with no descendants, the deceased’s ½ interest goes to 
         * the surviving spouse. Thus the surviving spouse owns the entire property 
         * outright as separate property. There is no usufruct in this situation. 
         * This is the main difference between the devolution of community and separate property.
         */
        const withoutDescendants = (family: Family): Family => {
            spouse.legalRights = 1
            return family
        }
    
        /**
         * Si le défunt laisse des enfants issus d'une précédente union, 
         * l'époux survivant hérite du quart de la succession en pleine propriété. 
         * Dans ce cas, les enfants héritent des 3/4 de la succession, 
         * réparti à parts égales, sous réserve de la représentation 
         * TODO : option du Conjoint
         * TODO : qualification du conjoint survivant
         * TODO : enfants avec plusieurs partenaires
         * TODO : représentation
         * TODO : exclure les enfants incapable d'hériter
         */
        const withDescendants = (family: Family): Family => {
            deCujus.childs.forEach(
                child => family.findMember(child)!.legalRights = 3 / deCujus.childs.length / 4
            )
            spouse.legalRights = 1/4
            return family
        }
    
        return deCujus.childs.length 
            ? withDescendants(family) 
            : withoutDescendants(family)
    }
}
    