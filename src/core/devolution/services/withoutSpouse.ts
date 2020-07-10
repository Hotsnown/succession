import { Family, Ordres } from '../entities'
import { ordreOneStrategy, OrdreTwoStrategy, ordreThreeStrategy, ordreFourStrategy } from '.'

/**
 * When the de cujus dies without a spouse.
 */
export function withoutSpouseStrategy(family: Family): Family {
   const strategy = Ordres.create(family).getFirstAppliableOrdreNumber(family)
      
   switch (strategy) {
      case 1: return ordreOneStrategy(family)
      case 2: return OrdreTwoStrategy(family)
      case 3: return ordreThreeStrategy(family)
      case 4: return ordreFourStrategy(family)
      default: return family
   }
}