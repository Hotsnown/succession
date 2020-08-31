/* prettier-ignore */
/*eslint-disable*/

import { Family, Branch, Refine, TreeNode, Member } from "../../entities"
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

        for (const parent of parents) {

            if (child.attributes.branch === 'maternelle') parent.attributes.branch = 'maternelle'
            else if (child.attributes.branch === 'paternelle') parent.attributes.branch = 'paternelle'
            
            dfs(parent, targetBranch)
        }
    }
    dfs (family.deCujus, targetBranch)
       
    return family
}

export const assignFenteCollaterale: Refine = (family) => {

    if (bothParentsOfDeCujusAreUndefined(family)) {
        console.debug('Error: the de Cujus parents must be both not undefined when trying to assign the fente collatérale.')
        return family
    }

    const indexFamily = family.indexMembers()

    indexFamily.members.forEach(member => {
        if (!TreeNode.getTreeNode(member.index)) {
            TreeNode.create(
                member.index,
                member.member_id,
            )
        }
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(
                    indexFamily.findMember(child).index, 
                    indexFamily.findMember(child).member_id, 
                    member.index
                    )
            }
        }
    })

    const LCA = TreeNode.getTreeNode(indexFamily.findMember('maternal_grand_father').index)

    indexFamily.findMember('maternal_grand_father').attributes.branch = 'maternelle'

    for (const ascendant of TreeNode.getTreeNode(indexFamily.findMember('mother').index).ancestors()) {
        indexFamily.findMember(ascendant.label).attributes.branch = 'maternelle'
    }
    
    for (const descendant of LCA.descendants()) {
        indexFamily.findMember(descendant.label).attributes.branch = 'maternelle'
    }

    return indexFamily
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

function bothParentsOfDeCujusAreUndefined(family: Family) {
    return family.findParentsOf(family.deCujus.member_id)[0] === undefined || family.findParentsOf(family.deCujus.member_id)[1] === undefined
}
