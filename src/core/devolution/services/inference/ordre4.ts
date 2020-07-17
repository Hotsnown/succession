import { Family, Refine } from '../../entities'
import { repartitionParTête } from '.'

export const ordreFourStrategy: Refine = (family) => {
    return repartitionParTête(family, family)
 }