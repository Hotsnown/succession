import { Heir, Status } from '../../../entities'
import { findParents } from '../../utils'
import * as R from 'ramda'

export interface AwareOfRepresentation extends Heir {
    isReprésenté?: boolean
    isReprésentant?: boolean
}

/**
 * If a descendant predeceases the de cujus, his share goes to his descendants
 * by representation.
 **/
export function representationOfADescendant(heirs: Heir[]): AwareOfRepresentation[] {

    const extractDescendantReprésentés = (heirs: Heir[]): AwareOfRepresentation[] =>
        heirs.map(
            heir => belongsToFirstOrdre(heir) && !isEligibleToInherit(heir) && hasChildEligibleToInherit(heirs, heir)
                ? Object.assign({ ...heir, isReprésenté: true }, heir)
                : Object.assign({ ...heir, isReprésenté: false }, heir)
        )

    return extractReprésentants(extractDescendantReprésentés, heirs)
}

/**
 * If a sibling predeceases the decedent, his share goes to his descendants
 * by representation.
 **/
export function representationOfASibling(heirs: Heir[]): AwareOfRepresentation[] {
    
    const extractSiblingReprésentés = (heirs: Heir[]): AwareOfRepresentation[] =>
        heirs.map(
            heir => belongsToSecondOrdre(heir) && !isEligibleToInherit(heir) && hasChildEligibleToInherit(heirs, heir)
                ? Object.assign({ ...heir, isReprésenté: true }, heir)
                : Object.assign({ ...heir, isReprésenté: false }, heir)
        )

    return extractReprésentants(extractSiblingReprésentés, heirs)
}

function extractReprésentants(extractReprésentés: (heirs: Heir[]) => AwareOfRepresentation[], heirs: Heir[]) {
    
    const extractReprésentants = (heirs: AwareOfRepresentation[]): AwareOfRepresentation[] =>
        heirs.map(
            heir => isDescendantOfARepresenté(heirs, heir) && isEligibleToInherit(heir)
                ? Object.assign({ ...heir, isReprésentant: true }, heir)
                : Object.assign({ ...heir, isReprésentant: false }, heir))
    
    return R.pipe(
        extractReprésentés, 
        extractReprésentants)(heirs)
}

function isEligibleToInherit(heir: Heir) {
    return heir.data.status === Status.Valid
}

function belongsToSecondOrdre(heir: Heir) {
    return heir.data.ordre === 2
}

function belongsToFirstOrdre(heir: Heir) {
    return heir.data.ordre === 1
}

function isDescendantOfARepresenté(heirs: AwareOfRepresentation[], heir: AwareOfRepresentation) {
    return (findParents(heirs, heir.member_id).find(heir => heir.isReprésenté))
}

function hasChildEligibleToInherit(heirs: AwareOfRepresentation[], targetHeir: AwareOfRepresentation) {
    return heirs.filter(heir => targetHeir.childs.includes(heir.member_id))
                .find(heir => isEligibleToInherit(heir))
}
