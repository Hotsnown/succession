import { Family, Branch, isMother, isFather, isAscendantOfFather, isAscendantOfMother } from "."
import * as R from 'ramda'

/**
* - A member belongs to the **maternal branch** if he is an ascendant of the de cujus' mother
* - A member belongs to the **paternal branch** if he is an ascendant of the de cujus' father
*/
export function assignFenteAscendante(family: Family) {

   const extractMother =
       (family: Family): Family => {
           family.members
               .filter(member =>
                   member.isParentOfDeCujus(family) &&
                   isMother(member))
               .forEach(member =>
                   member.attributes.branch = 'maternelle')
           return family
       }

   const extractFather =
       (family: Family): Family => {
           family.members
               .filter(member =>
                   member.isParentOfDeCujus(family) &&
                   isFather(member))
               .forEach(member =>
                   member.attributes.branch = 'paternelle')

           return family
       }

   const extractMaternalGrandParents =
       (family: Family): Family => {
           family.members
               .flatMap(member =>
                   isAscendantOfMother(family.findParentsOf(member.member_id), family))
               .forEach(member =>
                   member.attributes.branch = 'maternelle')
           return family
       }

   const extractPaternalGrandParents =
       (family: Family): Family => {
           family.members
               .flatMap(member =>
                   isAscendantOfFather(family.findParentsOf(member.member_id), family))
               .forEach(member =>
                   member.attributes.branch = 'paternelle')
           return family
       }

   const extractAscendants =
       (family: Family, targetBranch: Branch): Family => {

           function extract(family: Family): Family {
               family.members
                   .filter(member => member.attributes.branch === targetBranch)
                   .map(member => family.findParentsOf(member.member_id)
                       .filter(member => member !== undefined)
                       .map(member => member.member_id)
                       .map(member => family.findMember(member))
                       .forEach(member =>
                           member
                               ? member.attributes.branch === 'unqualified'
                                   ? member.attributes.branch = targetBranch
                                   : null
                               : null))

               return family
           }

           let recursiveFamily = family
           for (let n = 0; n < 6; n++) {
               recursiveFamily = extract(recursiveFamily)
           }
           return recursiveFamily
       }

   const extractPaternalAscendants = R.partialRight(extractAscendants, ['paternelle'])
   const extractMaternalAscendants = R.partialRight(extractAscendants, ['maternelle'])

   return R.pipe(
       extractMother,
       extractFather,
       extractMaternalGrandParents,
       extractPaternalGrandParents,
       extractPaternalAscendants,
       extractMaternalAscendants,
   )(family)
}

/**
 * A representant is a descendant of a predeceased heir (a représenté).
**/
export function assignRepresentation(family: Family): Family {

    const assignReprésenté =
        (family: Family) =>
            family.copyWith(family.members.map(member =>
                member.copyWith({ isReprésenté: member.isReprésentéIn(family) })))

    const assignReprésentant =
        (family: Family) =>
            family.copyWith(family.members.map(member =>
                member.copyWith({ isReprésentant: member.isReprésentantIn(family) })))

    return R.pipe(
        assignReprésenté,
        assignReprésentant,
    )(family)
}