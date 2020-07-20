import { Family, Member, Refine } from '../../entities'
import { ordreOneStrategy, ordreTwoStrategy, ordreThreeStrategy, ordreFourStrategy, withDescendants, withoutDescendants, getFirstAppliableOrdreNumber, byOrdre } from '.'

export function main(family: Family, deCujusId: string): Family {
    try {
        if (family.findMember('spouse')?.member_id) {
            return withSpouseController(family, family.findMember('spouse') as Member)
        }
        return withoutSpouseStrategy(family)
    } catch (error) {
        console.error(error.message)
        return family
    }
}

const withoutSpouseStrategy: Refine = (family) => {
    const strategy = getFirstAppliableOrdreNumber(family)
       
    switch (strategy) {
       case 1: return ordreOneStrategy(family)
       case 2: return ordreTwoStrategy(family)
       case 3: return ordreThreeStrategy(family)
       case 4: return ordreFourStrategy(family)
       default: return family
    }
}

function withSpouseController(family: Family, spouse: Member): Family {
    const deCujus = family.deCujus
    if (doDescendantExist(deCujus)) {
        return withDescendants(family, spouse, deCujus)
    } else {
        return withoutDescendants(family, spouse)
    }
}

function doDescendantExist(deCujus: Member): boolean {
    return deCujus.childs.length > 0;
}