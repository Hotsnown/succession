/* prettier-ignore */
/*eslint-disable*/

import { Family, Refine } from '../../entities'
import { ordreOneStrategy, ordreTwoStrategy, ordreThreeStrategy, ordreFourStrategy, withDescendants, withoutDescendants, getFirstAppliableOrdreNumber, byOrdre } from '../inference'

export const getDevolution: Refine = (family) => {

    if (doSpouseExist(family)) {
        return whithSpouseStrategy(family)
    } else {
        return withoutSpouseStrategy(family)
    }
}

const withoutSpouseStrategy: Refine = (family) => {
    const strategy = getFirstAppliableOrdreNumber(family)

    console.debug('Strategy : ', strategy)

    switch (strategy) {
        case 1: return ordreOneStrategy(family)
        case 2: return ordreTwoStrategy(family)
        case 3: return ordreThreeStrategy(family)
        case 4: return ordreFourStrategy(family)
        default: { console.error('Error: without spouse strategy reached more than 4 Ordre.'); return family }
    }
}

const whithSpouseStrategy: Refine = (family) => {
    const deCujus = family.deCujus

    if (family.deCujus.attributes.spouse === 'without spouse' || 
        family.deCujus.attributes.spouse === 'unassigned') return family

    const spouses = family.deCujus.attributes.spouse.map(spouse => family.findMember(spouse))
    const spouseEligibleToInherit = spouses.filter(spouse => spouse.isEligibleToInherit())[0]

    if (doDescendantExist(family)) {
        return withDescendants(family, spouseEligibleToInherit, deCujus)
    } else {
        return withoutDescendants(family, spouseEligibleToInherit)
    }
}

function doSpouseExist(family: Family): boolean {
    if (family.deCujus.attributes.spouse === 'without spouse') return false

    try {
        if (family.deCujus.attributes.spouse === 'unassigned') {
            console.error('Error: Spouses of ' + family.deCujus.member_id + ' should be assigned before any attempt to read it.');
            return false;
        }
        else return family.deCujus.attributes.spouse
            .map(spouse => family.findMember(spouse))
            .filter(spouse => spouse !== undefined && spouse.isEligibleToInherit())
            .some(spouse => spouse?.member_id !== undefined)
    } catch {
        return false
    }
}

function doDescendantExist(family: Family): boolean {
    return family.deCujus.childs.map(child => family.findMember(child)).filter(child => child.isEligibleToInherit()).length > 0;
}