import { Member } from "../../../entities";
import { findParents } from "../../utils";
import { isEligibleToInherit } from '../utils'
import * as R from 'ramda'

interface AwareOfBranch extends Member {
    branch: 'paternelle' | 'maternelle' | 'unknown'
}

/**
 * If the ascendants in the paternal and maternal lines are in the
 * same degree, the property is divided into two equal shares, one of which goes
 * to the ascendants on the paternal side, and the other to the ascendants on
 * the maternal side, whether the number of ascendants on each side be equal
 * or not.
 */
export function fenteAscendante(members: Member[]) {

    const extractMother = (members: Member[]): AwareOfBranch[] | Member[] =>
        members.map(
            member => isParentOfDeCujus(members, isDecujus(members)) && !isEligibleToInherit(member) && isMother(member)
                ? Object.assign({ ...member, branch: 'maternelle' as AwareOfBranch["branch"] }, member)
                : member
        )

    const extractFather = (members: Member[]): AwareOfBranch[] | Member[] =>
        members.map(
            member => isParentOfDeCujus(members, isDecujus(members)) && !isEligibleToInherit(member) && isFather(member)
                ? Object.assign({ ...member, branch: 'paternelle' as AwareOfBranch["branch"] }, member)
                : member
        )

    const extractMaternalAscendants = (members: Member[]): AwareOfBranch[] | Member[] =>
        members.map(
            member => isAscendantOfMother(members, findParents(members, member.member_id))
                ? Object.assign({ ...member, branch: 'maternelle' as AwareOfBranch["branch"] }, member)
                : member
        )

    const extractPaternalAscendants = (members: Member[]): AwareOfBranch[] | Member[] =>
        members.map(
            member => isAscendantOfFather(members, findParents(members, member.member_id))
                ? Object.assign({ ...member, branch: 'paternelle' as AwareOfBranch["branch"] }, member)
                : member
        )

    return R.pipe(
        extractMother,
        extractFather,
        extractPaternalAscendants,
        extractMaternalAscendants,
        )(members)
}

const isFather =
    (member: Member) => member.member_id === 'father'

const isMother =
    (member: Member) => member.member_id === 'mother'

const isParentOfDeCujus =
    (members: Member[], deCujus: Member) => //Family now know who is the de cujus
        members.filter(member => member.member_id ===
            findParents(members, deCujus.member_id)[0].member_id ||
            findParents(members, deCujus.member_id)[1].member_id)

const isDecujus =
    (members: Member[]): Member => members.filter(member => member.attributes.ordre === 0)[0]

const isAscendantOfMother =
    (members: Member[], parents: Member[]): Member[] => {
        const result = []
        for (const parent of parents) {
            if (parent !== undefined && typeof parent !== undefined) {
                if (isMother(parent)) {
                    result.push(findParents(members, parent.member_id)[0])
                }
            }
        }
        return result
    }


const isAscendantOfFather =
    (members: Member[], parents: Member[]): Member[] => {
        const result = []
        for (const parent of parents) {
            if (parent !== undefined) {
                if (isFather(parent)) {
                    result.push(findParents(members, parent.member_id)[0])
                }
            }
        }
        return result
    }
