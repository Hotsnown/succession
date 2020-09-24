/* prettier-ignore */
/*eslint-disable*/

import { Family, Branch, Refine, Member } from "../../entities"
import { isMother, isFather } from '../inference'

import * as R from 'ramda'

/**
 * - **Branche ascendante maternelle** : Given a deCujus, a node belongs to the branche maternelle if it is the deCujus’s mother or if it is an ascendant of the deCujus’s mother.
 * - **Branche ascendante paternelle** : Given a deCujus, a node belongs to the branche paternelle if it is the deCujus’s father or if it is an ascendant of the deCujus’s mother.
*/
export const assignFenteAscendante: Refine = (family) => {

    if (bothParentsOfDeCujusAreUndefined(family)) {
        console.debug('Error: the de Cujus parents must be both not undefined when trying to assign the fente ascendante.')
        return family
    }

   const extractPaternalAscendants = R.partial(extractAscendants, ['paternelle'])
   const extractMaternalAscendants = R.partial(extractAscendants, ['maternelle'])

   return R.pipe(
       extractMother,
       extractFather,
       extractPaternalAscendants,
       extractMaternalAscendants,
   )(family)
}

function extractAscendants (targetBranch: Branch, family: Family): Family {

    function dfs(child: Member, targetBranch: Branch) {

        if (!child) return

        const parents = family.findParentsOf(family.findMember(child.member_id).member_id)
                                .filter(member => member !== undefined);

        for (let parent of parents) {

            if (child.attributes.branch === 'maternelle') parent.attributes.branch = 'maternelle'
            else if (child.attributes.branch === 'paternelle') parent.attributes.branch = 'paternelle'
            
            dfs(parent, targetBranch)
        }
    }
    dfs (family.deCujus, targetBranch)
       
    return family
}

/**
 * - **Branche collatérale maternelle** : Given a deCujus, a node belongs to the branche maternelle if his ascendant is the deCujus’s mother's ascendant.
 * - **Branche collatérale paternelle** : Given a deCujus, a node belongs to the branche paternelle if his ascendant is the deCujus’s father's ascendant
*/
export const assignFenteCollaterale: Refine = (family) => {

    if (bothParentsOfDeCujusAreUndefined(family)) {
        console.debug('Error: the de Cujus parents must be both not undefined when trying to assign the fente collatérale.')
        return family
    }

    const extractMaternalCollaterals = R.partial(extractCollaterals, ['maternelle'])
    const extractPaternalCollaterals = R.partial(extractCollaterals, ['paternelle'])
   
    function extractCollaterals(targetBranch: Branch, family: Family): Family {
        const [target] = targetBranch === 'paternelle' ? family.members.filter(member => isFather(member)) : family.members.filter(member => isMother(member))
        const extract = (member: Member): Member => {
            if (isAscendant(family, member) || isDeCujus(member, family)) return member
            return R.intersection(
                family.ancestorsOf(target), 
                family.ancestorsOf(member)
                ).length > 0 ? member.copyWith({ branch: targetBranch}) : member}
        return Family.create(R.map(extract, family.members), family.deCujus.member_id)
    }

    return R.pipe(
        extractMother,
        extractFather,
        extractMaternalCollaterals,
        extractPaternalCollaterals,
    )(family)
}

const extractMother: Refine = (family) => {
    family.members
        .filter(member => member.isParentOfDeCujus(family) && isMother(member))
        .forEach(member => member.attributes.branch = 'maternelle')
    return family
}

const extractFather: Refine = (family) => {
    family.members
        .filter(member => member.isParentOfDeCujus(family) && isFather(member))
        .forEach(member => member.attributes.branch = 'paternelle')
    return family
}

function isDeCujus(member: Member, family: Family) {
    return member.member_id === family.deCujus.member_id
}

function isAscendant(family: Family, member: Member) {
    return family.ancestorsOf(family.deCujus).map(m => m.member_id).includes(member.member_id)
}

function bothParentsOfDeCujusAreUndefined(family: Family) {
    return family.findParentsOf(family.deCujus.member_id)[0] === undefined || family.findParentsOf(family.deCujus.member_id)[1] === undefined
}
