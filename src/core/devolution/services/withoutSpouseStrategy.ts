import { Family, Ordres } from '../entities'
import { ordreOneStrategy, OrdreTwoStrategy, ordreThreeStrategy, ordreFourStrategy } from '.'

/**
 * When the de cujus dies without a spouse.
 */
export function getSolutionController(family: Family): Family {

   try {

      const strategy = Ordres.create(family).getFirstAppliableOrdreNumber(family)
      
      switch (strategy) {
         //@ts-ignore
         case 1: return ordreOneStrategy(family)
         //@ts-ignore
         case 2: return OrdreTwoStrategy(family)
         //@ts-ignore
         case 3: return ordreThreeStrategy(family)
         //@ts-ignore
         case 4: return ordreFourStrategy(family)
         default: return family
      }
   } catch (e) {
      console.error(e)
      return family
   }
   
}