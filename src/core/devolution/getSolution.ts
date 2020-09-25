/* prettier-ignore */
/*eslint-disable*/

import treeParser from './services/tree-parser2'
import { getQualification } from './services/qualification/main'
import { getDevolution } from './services/inference/main'
import { Family } from './entities'

import * as R from 'ramda'

export function getSolution (memberListFromUI: any, deCujusId: string, rootId: string): Family {
    
    if (memberListFromUI === undefined) {
        console.error("Error: member list data from UI is undefined")
        return (Family.create([], ''))
    }

    const res = treeParser(memberListFromUI)

    const family = Family.create(
        Family.create(res, deCujusId, rootId).members.filter(member => member !== undefined),
        deCujusId, 
        rootId
        )

    //TODO member where degree > 6 is not eligible to inherit
    
    try {
        return R.pipe(
            getQualification,
            getDevolution,
        )(family)
    } catch (e) {
        console.error(e)
        return family
    }
}
