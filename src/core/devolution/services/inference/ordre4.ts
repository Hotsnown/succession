import { Family } from '../../entities'
import { repartitionParTête } from '.'

export function ordreFourStrategy(family: Family): Family {
    return repartitionParTête(family, family)
 }