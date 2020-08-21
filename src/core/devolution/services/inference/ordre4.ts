/* prettier-ignore */
/*eslint-disable*/

import { Refine } from '../../entities'
import { extractFente } from './utils/Fente'

export const ordreFourStrategy: Refine = (family) => {
    return extractFente(family)
 }