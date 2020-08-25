/* prettier-ignore */
/*eslint-disable*/

import { assignDegré } from './Degré'
import { assignOrdre } from './Ordre'
import { assignRepresentation } from "./Représentation";
import { assignFenteAscendante } from "./Fente";
import { Refine } from '../../entities'
import * as R from 'ramda'

export const getQualification: Refine = (family) => {
    return R.pipe(
        assignDegré,
        assignOrdre,
        assignRepresentation,
        assignFenteAscendante,
    )(family)
}