import { Family, Branch, Refine } from "../../entities"
import { isMother, isFather, isAscendantOfFather, isAscendantOfMother } from '../inference'

import * as R from 'ramda'

/**
* - A member belongs to the **maternal branch** if he is an ascendant of the de cujus' mother
* - A member belongs to the **paternal branch** if he is an ascendant of the de cujus' father
*/
export const assignFenteAscendante: Refine = (family) => {

   const extractMother: Refine = (family) => {
           family.members
               .filter(member =>
                   member.isParentOfDeCujus(family) &&
                   isMother(member))
               .forEach(member =>
                   member.attributes.branch = 'maternelle')
           return family
       }

   const extractFather: Refine = (family) => {
           family.members
               .filter(member =>
                   member.isParentOfDeCujus(family) &&
                   isFather(member))
                .map(m => {m.member_id; return m})
               .forEach(member =>
                   member.attributes.branch = 'paternelle')

           return family
       }

   const extractMaternalGrandParents: Refine = (family) => {
           family.members
               .flatMap(member =>
                   isAscendantOfMother(family.findParentsOf(member.member_id), family))
               .forEach(member =>
                   member.attributes.branch = 'maternelle')
           return family
       }

   const extractPaternalGrandParents: Refine = (family) => {
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
                               ? member.attributes.branch === 'unassigned'
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