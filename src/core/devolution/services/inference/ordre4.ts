/* prettier-ignore */
/*eslint-disable*/

import { Refine } from '../../entities'
import { répartitionParBranche } from './utils/RépartitionParBranche'
import { repartitionParTête } from './utils/RépartitionParTête'

export const ordreFourStrategy: Refine = (family) => {
    if (family.findParentsOf(family.deCujus.member_id).every(member => member !== undefined)) {
        return répartitionParBranche(family)
    } else {
        return repartitionParTête(family, family)
    }
 }