import { Heir } from "../../../entities";
import { findParents } from "../../utils";
import { isEligibleToInherit } from '../utils'
import * as R from 'ramda'

interface AwareOfBranch extends Heir {
    branch: 'paternelle' | 'maternelle' | 'unknown'
}

/**
 * If the ascendants in the paternal and maternal lines are in the
 * same degree, the property is divided into two equal shares, one of which goes
 * to the ascendants on the paternal side, and the other to the ascendants on
 * the maternal side, whether the number of ascendants on each side be equal
 * or not.
 */
export function fenteAscendante(heirs: Heir[]) {

    const extractMother = (heirs: Heir[]): AwareOfBranch[] | Heir[] =>
        heirs.map(
            heir => isParentOfDeCujus(heirs, isDecujus(heirs)) && !isEligibleToInherit(heir) && isMother(heir)
                ? Object.assign({ ...heir, branch: 'maternelle' as AwareOfBranch["branch"] }, heir)
                : heir
        )

    const extractFather = (heirs: Heir[]): AwareOfBranch[] | Heir[] =>
        heirs.map(
            heir => isParentOfDeCujus(heirs, isDecujus(heirs)) && !isEligibleToInherit(heir) && isFather(heir)
                ? Object.assign({ ...heir, branch: 'paternelle' as AwareOfBranch["branch"] }, heir)
                : heir
        )

    const extractMaternalAscendants = (heirs: Heir[]): AwareOfBranch[] | Heir[] =>
        heirs.map(
            heir => isAscendantOfMother(heirs, findParents(heirs, heir.member_id))
                ? Object.assign({ ...heir, branch: 'maternelle' as AwareOfBranch["branch"] }, heir)
                : heir
        )

    const extractPaternalAscendants = (heirs: Heir[]): AwareOfBranch[] | Heir[] =>
        heirs.map(
            heir => isAscendantOfFather(heirs, findParents(heirs, heir.member_id))
                ? Object.assign({ ...heir, branch: 'paternelle' as AwareOfBranch["branch"] }, heir)
                : heir
        )

    return R.pipe(
        extractMother,
        extractFather,
        extractPaternalAscendants,
        extractMaternalAscendants,
        )(heirs)
}

const isFather =
    (heir: Heir) => heir.member_id === 'father'

const isMother =
    (heir: Heir) => heir.member_id === 'mother'

const isParentOfDeCujus =
    (heirs: Heir[], deCujus: Heir) =>
        heirs.filter(heir => heir.member_id ===
            findParents(heirs, deCujus.member_id)[0].member_id ||
            findParents(heirs, deCujus.member_id)[1].member_id)

const isDecujus =
    (heirs: Heir[]): Heir => heirs.filter(heir => heir.data.ordre === 0)[0]

const isAscendantOfMother =
    (heirs: Heir[], parents: Heir[]): Heir[] => {
        const result = []
        for (const parent of parents) {
            if (parent !== undefined && typeof parent !== undefined) {
                if (isMother(parent)) {
                    result.push(findParents(heirs, parent.member_id)[0])
                }
            }
        }
        return result
    }


const isAscendantOfFather =
    (heirs: Heir[], parents: Heir[]): Heir[] => {
        const result = []
        for (const parent of parents) {
            if (parent !== undefined) {
                if (isFather(parent)) {
                    result.push(findParents(heirs, parent.member_id)[0])
                }
            }
        }
        return result
    }
