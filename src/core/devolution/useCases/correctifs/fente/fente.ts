import { Member, Family } from "../../../entities";
import { findParents } from "../../utils";
import * as R from 'ramda'

/**
 * If the ascendants in the paternal and maternal lines are in the
 * same degree, the property is divided into two equal shares, one of which goes
 * to the ascendants on the paternal side, and the other to the ascendants on
 * the maternal side, whether the number of ascendants on each side be equal
 * or not.
 */
export function fenteAscendante(family: Family) {

    const members = family.members
    const deCujus = family.props.value.deCujus

    const extractMother = 
        (members: Member[]): Member[] => {
            members
                .filter(member => 
                    isParentOfDeCujus(members, deCujus) && 
                    !member.isEligibleToInherit() && 
                    isMother(member))
                .forEach(member => 
                    member.attributes.branch = 'maternelle')
            return members
        }

    const extractFather = 
        (members: Member[]): Member[] => {
            members
                .filter(member => 
                    isParentOfDeCujus(members, deCujus) && 
                    !member.isEligibleToInherit() && 
                    isFather(member))
                .forEach(member => 
                    member.attributes.branch = 'paternelle')
            
            return members
        }

    const extractMaternalAscendants = 
            (members: Member[]): Member[] => {
                members
                    .flatMap(member =>
                        isAscendantOfMother(findParents(family, member.member_id)))
                    .forEach(member =>
                        member.attributes.branch = 'maternelle')
                return members
            }

    const extractPaternalAscendants =
        (members: Member[]): Member[] => {
            members
                .flatMap(member =>
                    isAscendantOfFather(findParents(family, member.member_id)))
                .forEach(member =>
                    member.attributes.branch = 'paternelle')
            return members
        }

    const extractAscendants =
        (members: Member[]): Member[] => {
            members
                .map(c => findParents(family, c.member_id).map(c => c?.member_id))
                .map(c => family.findMember(c[0]))
                .forEach(member => 
                    member
                    ? member.attributes.branch === 'unknown'
                        ? member.attributes.branch = 'maternelle'
                        : null
                    : null)
            return members
        }

    const isParentOfDeCujus =
        (members: Member[], deCujus: Member) =>
            members.filter(member => member.member_id ===
                findParents(family, deCujus.member_id)[0].member_id ||
                findParents(family, deCujus.member_id)[1].member_id)

    const isAscendantOfMother =
        (parents: Member[]): Member[] => {
            const result = []
            for (const parent of parents) {
                if (parent !== undefined) {
                    if (isMother(parent)) {
                        result.push(findParents(family, parent.member_id)[0])
                    }
                }
            }
            return result[0]
                ? [family.findMember(result[0].member_id)]
                : []
        }

    const isAscendantOfFather =
        (parents: Member[]): Member[] => {
            const result = []
            for (const parent of parents) {
                if (parent !== undefined) {
                    if (isFather(parent)) {
                        result.push(findParents(family, parent.member_id)[0])
                    }
                }
            }
            return result[0]
                ? [family.findMember(result[0].member_id)]
                : []
        }

    return R.pipe(
        extractMother,
        extractFather,
        extractPaternalAscendants,
        extractMaternalAscendants,
        extractAscendants)(members)
}

const isFather =
    (member: Member) => member.member_id === 'father'

const isMother =
    (member: Member) => member.member_id === 'mother'
