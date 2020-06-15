import { Family } from "../../../entities";
import { isMother, isFather, isAscendantOfFather, isAscendantOfMother, isParentOfDeCujus} from './utils'
import * as R from 'ramda'

/**
 * If the ascendants in the paternal and maternal lines are in the
 * same degree, the property is divided into two equal shares, one of which goes
 * to the ascendants on the paternal side, and the other to the ascendants on
 * the maternal side, whether the number of ascendants on each side be equal
 * or not.
 */
export function assignFenteAscendante(family: Family) {

    const deCujus = family.props.value.deCujus

    const extractMother = 
        (family: Family): Family => {
            family.members
                .filter(member => 
                    isParentOfDeCujus(family, deCujus) && 
                    isMother(member))
                .forEach(member => 
                    member.attributes.branch = 'maternelle')
            return family
        }

    const extractFather = 
        (family: Family): Family => {
            family.members
                .filter(member => 
                    isParentOfDeCujus(family, deCujus) && 
                    isFather(member))
                .forEach(member => 
                    member.attributes.branch = 'paternelle')
            
            return family
        }

    const extractMaternalAscendants = 
        (family: Family): Family => {
                family.members
                    .flatMap(member =>
                        isAscendantOfMother(family.findParentsOf(member.member_id), family))
                    .forEach(member =>
                        member.attributes.branch = 'maternelle')
                return family
            }

    const extractPaternalAscendants =
        (family: Family): Family => {
            family.members
                .flatMap(member =>
                    isAscendantOfFather(family.findParentsOf(member.member_id), family))
                .forEach(member =>
                    member.attributes.branch = 'paternelle')
            return family
        }

    const extractAscendants =
        (family: Family): Family => {
            family.members
                .map(c => family.findParentsOf(c.member_id).map(c => c?.member_id))
                .map(c => family.findMember(c[0]))
                .forEach(member => 
                    member
                    ? member.attributes.branch === 'unassigned'
                        ? member.attributes.branch = 'maternelle'
                        : null
                    : null)
            return family
        }

    return R.pipe(
        extractMother,
        extractFather,
        extractPaternalAscendants,
        extractMaternalAscendants,
        extractAscendants)(family)   
}
