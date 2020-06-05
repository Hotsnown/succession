import { Family } from '../../../entities'
import * as R from 'ramda'
const assert = require('assert')

/**
 * If a descendant or a sibling predeceases the de cujus, his share goes to his descendants
 * by representation.
 * @param heirs Family structure under examination
 **/
export function representation(heirs: Family): Family {

    const extractReprésentés = (heirs: Family): Family => {
        
        //preconditions 

        for (const heir of heirs.value) {
            heir.isReprésenté = heir.isReprésentable(heirs) 
        }

        //postconditions
        heirs.value.map(heir => assert.notEqual(heir.isReprésenté, undefined))
        return heirs
    }

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

