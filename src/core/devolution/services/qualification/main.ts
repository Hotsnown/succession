import { assignDegré } from './Degré'
import { assignOrdre } from './Ordre'
import { assignRepresentation } from "./Représentation";
import { assignFenteAscendante } from "./Fente";
import { Refine } from '../../entities'
import * as R from 'ramda'

export const main: Refine = (family) => {
    return R.pipe(
        assignDegré,
        assignOrdre,
        assignRepresentation,
        assignFenteAscendante,
    )(family)
}