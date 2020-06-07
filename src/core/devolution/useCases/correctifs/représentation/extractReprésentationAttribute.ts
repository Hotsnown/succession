import { Family } from '../../../entities'

/**
 * If a descendant or a sibling predeceases the de cujus, his share goes to his descendants
 * by representation.
 * @param heirs Family structure under examination
 **/
export function representation(heirs: Family): Family {

    //sequence matter
    heirs.value.forEach(heir => 
        heir.isReprésenté = heir.isReprésentableIn(heirs))
    heirs.value.forEach(heir => 
        heir.isReprésentant = heir.isRepresentativeIn(heirs))

    return heirs
}