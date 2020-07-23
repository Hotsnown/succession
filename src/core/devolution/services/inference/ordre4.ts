/* prettier-ignore */
/*eslint-disable*/

import { Family, Refine } from '../../entities'
import { repartitionParTête } from '../inference'

export const ordreFourStrategy: Refine = (family) => {
    return repartitionParTête(family, family)
 }