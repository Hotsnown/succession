import { Family, Ordre } from '../../../entities'
import * as R from 'ramda'
const assert = require('assert')

/**
 * If a descendant predeceases the de cujus, his share goes to his descendants
 * by representation.
 * @param heirs Family structure under examination
 **/
export function representationOfADescendant(heirs: Family): Family {

    const extractDescendantReprésentés = (heirs: Family): Family => {
        
        //preconditions

        for (const heir of heirs.value) {
            if (heir.belongsTo(Ordre.Ordre1) && !heir.isEligibleToInherit() && heir.hasChildEligibleToInheritIn(heirs)) {
                heir.isReprésenté = true
            } else {
                heir.isReprésenté = false
            }
        }

        //postconditions
        heirs.value.map(heir => assert.notEqual(heir.isReprésenté, undefined))
        return heirs
    }

    return extractReprésentants(extractDescendantReprésentés, heirs)
}

/**
 * If a sibling predeceases the de cujus, his share goes to his descendants
 * by representation.
 * @param heirs Family structure under examination 
 **/
export function representationOfASibling(heirs: Family): Family {
    
    const extractSiblingReprésentés = (heirs: Family): Family => {
        for (const heir of heirs.value) {
            if (heir.belongsTo(Ordre.Ordre2) && !heir.isEligibleToInherit() && heir.hasChildEligibleToInheritIn(heirs)) {
                heir.isReprésenté = true
            } else {
                heir.isReprésenté = false
            }
        }

        heirs.value.map(c => console.log(c))
        return heirs
    }

    return extractReprésentants(extractSiblingReprésentés, heirs)
}

function extractReprésentants(extractReprésentés: (heirs: Family) => Family, heirs: Family) {
    
    const extractReprésentants = (heirs: Family): Family => {
        for (const heir of heirs.value) {
            if (heir.isDescendantOfARepresenté(heirs) && heir.isEligibleToInherit()) {
                heir.isReprésentant = true
            } else {
                heir.isReprésentant = false
            }
        }
        return heirs
    }
    
    return R.pipe(
        extractReprésentés, 
        extractReprésentants)(heirs)
}