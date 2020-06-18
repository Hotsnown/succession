import { Family, repartitionParTête } from '../entities'

export function ordreFourStrategy(family: Family): Family {
    return repartitionParTête(family, family)
 }