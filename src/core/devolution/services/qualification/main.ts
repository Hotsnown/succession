/* prettier-ignore */
/*eslint-disable*/

import { assignDegrés } from './Degré'
import { assignOrdres } from './Ordre'
import { assignRepresentation } from "./Représentation";
import { assignFenteAscendante, assignFenteCollaterale } from "./Fente";
import { Refine } from '../../entities'
import * as R from 'ramda'

export const getQualification: Refine = (family) => {
    return R.pipe(
        assignDegrés,
        assignOrdres,
        assignRepresentation,
        assignFenteAscendante,
        assignFenteCollaterale //root does not go here
    )(family)
}