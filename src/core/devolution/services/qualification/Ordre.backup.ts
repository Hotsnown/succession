/* prettier-ignore */
/*eslint-disable*/

import { Refine, Family, Member, TreeNode } from '../../entities'
import { intersection } from 'ramda'

/**
 * Each node must be annotated with the ordre attribute, witch can take any of this values: 1 | 2 | 3 | 4 | 'outsider'.
 * - **Ordre1** : Given a deCujus, a node x belongs to ordre 1 if x is a descendant of the deCujus.
 * - **Ordre 2** : Given a deCujus, a node x belongs to ordre 2 if the LCA of x and deCujus is the mother/father of the deCujus
 * - **Ordre 3** : Given a deCujus, a node x belongs to ordre 3 if x is an ascendant of the deCujus.
 * - **Ordre 4** : Given a deCujus, a node x belongs to ordre 4 if the LCA of x and the deCujus is the grandparent/grand-grand-parent of the deCujus.
 */
export const assignOrdre: Refine = (family) => {

  const graph = new Ordre(family.members.length)
  const indexFamilyWithRoot = Family.create(family.indexMembers().members, family.root.member_id)
  
  return Family.create(
    indexFamilyWithRoot.map(member => {
      return graph.assignOrdre(
        member, 
        indexFamilyWithRoot
        )}).members
        )
}

export class Ordre { 
    V: number
    adj: Member[][]
    
    constructor(V: number) { 
        this.V = V; 
        this.adj = new Array<Member>(V).map(_ => new Array<Member>());

        for (let i = 0; i < V; i++) 
            this.adj[i] = new Array<Member>(); 
    }

    addEdge(src: Member, des: Member): void { 
        this.adj[src.index].push(des); 
    }

    assignOrdre(nodeToQualify: Member, family: Family): Member {
      
      //const LCA = this.findLowestCommonAncestor(deCujus, nodeToQualify, root)
      const deCujus = family.deCujus
      const LCA = this.findLCA(deCujus, nodeToQualify, family.root)

      deCujus.attributes.ordre = 0

      if (LCA === undefined || LCA === null) {
        console.error(deCujus.member_id, nodeToQualify.member_id)
        return nodeToQualify
      }

      const parents = family.findParentsOf(nodeToQualify.member_id)
      const grandParents = parents.map(member => family.findParentsOf(member ? member.member_id : null)) /// ???

      if (isDescendant(LCA, deCujus)) {nodeToQualify.attributes.ordre = 1; return nodeToQualify}
      if (isPriviledgedCollateral(LCA, parents[0], nodeToQualify)) {nodeToQualify.attributes.ordre = 2; return nodeToQualify}
      if (isAscendant(LCA, nodeToQualify)) {nodeToQualify.attributes.ordre = 3; return nodeToQualify}
      if (isCollateral(LCA, grandParents[0][0], nodeToQualify)) {nodeToQualify.attributes.ordre = 4; return nodeToQualify}
      
      nodeToQualify.attributes.ordre = 'outsider'
      return nodeToQualify
    }

    /* public findLCA(a: Member, b: Member, family: Family): Member {

      if (a.member_id === b.member_id) return a;

      const x = [a]
      const y = [b]

      let xParents: Member[] = family.findParentsOf(a.member_id)
      let yParents: Member[] = family.findParentsOf(b.member_id)

      do {
        x.push(...xParents)
        y.push(...yParents)

        const [ret] = intersection(x, y)

        if (ret !== undefined) {
          console.log("LCA found:" + ret.member_id + a.member_id + b.member_id)
          return ret
        }

        const temp = xParents
        xParents = []
        
        for (let parent of temp) {
          if (parent !== undefined) {
            xParents.push(...family.findParentsOf(parent.member_id))
          }
        }

        const temp2 = yParents
        yParents = []

        for (let parent of temp2) {
          if (parent !== undefined) {
            yParents.push(...family.findParentsOf(parent.member_id))
          }
        }

      } while (!xParents && !yParents);

      console.error("No common ancestor found")
    } */
    
    /* public findLCA (a: Member, b: Member, family: Family, from: Member = null): Member {
      if (isDescendantOf(a, b, family, from)) return a
      for (let parent of family.findParentsOf(a.member_id)) {
        if (this.findLCA(parent, b, family, a)) return parent
      } 
      console.error('No LCA found')
    } */

    //TODO : on simpson's tree, when bart (or maggie) is the de cujus, [marge, unknown, mona, milhouse, ...] eg outsiders are
    //qualified as members of ordre 1.
    //TODO: on Ordre1's tree, when son is the de cujus, outsiders are qualified as members of ordre 4 and real ordre are not qualified
    // as members of ordre 4
    //TODO: on Ordre1's tree, when grandchildren3 is the decujus, outsiders are qualified as members of ordre 4
    //and members of ordre 2 are not qualified
    //TODO: on Ordre1's tree, when grandgrandchildren is the decujus, putsiders are qualified as ordre 1
    private findLCA(deCujus: Member, nodeToQualify: Member, root: Member): Member {

      if (deCujus.member_id === root.member_id || nodeToQualify.member_id === root.member_id) return root;

      let count = 0;
      let temp: Member | null = null;

      for (let iter of this.adj[root.index]) {
        const res = this.findLCA(deCujus, nodeToQualify, iter);
        if (res !== null) {
          count++;
          temp = res;
        }
      }
      
      if (count == 2) return root;
        
      return temp as Member;
    }
}

function isDescendant(LCA: Member, deCujus: Member): boolean {
  return LCA.member_id === deCujus.member_id;
}

function isPriviledgedCollateral(LCA: Member, parent: Member, nodeToQualify: Member): boolean {
  return LCA.member_id === parent.member_id && nodeToQualify.member_id !== parent.member_id;
}

function isAscendant(LCA: Member, nodeToQualify: Member): boolean {
  return LCA.member_id === nodeToQualify.member_id;
}

function isCollateral(LCA: Member, grandParent: Member, nodeToQualify: Member): boolean {
  return LCA.member_id === grandParent.member_id && nodeToQualify.member_id !== grandParent.member_id;
}

function isDescendantOf(a: Member, b: Member, family: Family, from: Member = null): boolean {
  if (a.childs.includes(b.member_id)) return true 
  else {
    for (let descendant of a.childs) {
      if (descendant === from.member_id) continue
      if (isDescendantOf(a, family.findMember(descendant), family)) return true
    }
  }
  return false
} */