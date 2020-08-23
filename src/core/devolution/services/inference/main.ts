/* prettier-ignore */
/*eslint-disable*/

import { Family, Member, Refine } from '../../entities'
import { ordreOneStrategy, ordreTwoStrategy, ordreThreeStrategy, ordreFourStrategy, withDescendants, withoutDescendants, getFirstAppliableOrdreNumber, byOrdre } from '../inference'

export const main: Refine = (family) => {
    if (doSpouseExist(family)) {
        return whithSpouseStrategy(family)
    }
    return withoutSpouseStrategy(family)
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

const whithSpouseStrategy: Refine = (family) => {
    const deCujus = family.deCujus
    //TODO: remove hardcoded find spouse
    const spouse = family.findMember('spouse') as Member
    if (doDescendantExist(deCujus)) {
        return withDescendants(family, spouse, deCujus)
    } else {
        return withoutDescendants(family, spouse)
    }
}

function doSpouseExist(family: Family): boolean {
    //TODO: remove hardcoded find spouse
    return family.findMember('spouse')?.member_id !== undefined
}

function doDescendantExist(deCujus: Member): boolean {
    return deCujus.childs.length > 0;
}