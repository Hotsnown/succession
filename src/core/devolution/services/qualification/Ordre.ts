import { Refine, Family, Member, MemberConstructor } from '../../entities'

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

  graph.buildGraph(indexFamilyWithRoot)
  return assignOrdreOf(indexFamilyWithRoot, family, graph)
}

class Ordre { 
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

    buildGraph(family: Family) {
      family.members.forEach(member => {
        if (member.childs) {
          for (let child of member.childs) {
            if (!family.findMember(child)) {
              console.error(`${child} has not been found`)
            }
            else {
              this.addEdge(member, family.findMember(child) as Member)
            }
          }
        }
      })
    }

    assignOrdre(deCujus: Member, nodeToQualify: Member, root: Member, parent: Member, grandParent: Member): Member {
      
      const LCA = this.findLowestCommonAncestor(deCujus, nodeToQualify, root)

      deCujus.attributes.ordre = 0

      if (isDescendant(LCA, deCujus)) {nodeToQualify.attributes.ordre = 1; return nodeToQualify}
      if (isPriviledgedCollateral(LCA, parent, nodeToQualify)) {nodeToQualify.attributes.ordre = 2; return nodeToQualify}
      if (isAscendant(LCA, nodeToQualify)) {nodeToQualify.attributes.ordre = 3; return nodeToQualify}
      if (isCollateral(LCA, grandParent, nodeToQualify)) {nodeToQualify.attributes.ordre = 4; return nodeToQualify}
      
      nodeToQualify.attributes.ordre = 'outsider'
      return nodeToQualify
    }

    //TODO : on simpson's tree, when bart (or maggie) is the de cujus, [marge, unknown, mona, milhouse, ...] eg outsiders are
    //qualified as members of ordre 1.
    //TODO: on Ordre1's tree, when son is the de cujus, outsiders are qualified as members of ordre 4 and real ordre are not qualified
    // as members of ordre 4
    //TODO: on Ordre1's tree, when grandchildren3 is the decujus, outsiders are qualified as members of ordre 4
    //and members of ordre 2 are not qualified
    //TODO: on Ordre1's tree, when grandgrandchildren is the decujus, putsiders are qualified as ordre 1
    private findLowestCommonAncestor(deCujus: Member, nodeToQualify: Member, root: Member): Member {
      
      if (deCujus.member_id === root.member_id || nodeToQualify.member_id === root.member_id) return root;

      let count = 0;
      let temp: Member | null = null;

      for (let iter of this.adj[root.index]) {
        const res = this.findLowestCommonAncestor(deCujus, nodeToQualify, iter);
        if (res) {
          count++;
          temp = res;
        }
      }
      
      if (count === 2) return root;
        
      return temp as Member;
    }
}

//@ts-ignore
export const findById = (data: Family, index: number): Member => data.members.find(member => member.index === index)! || console.error(`${index} has not been found`)

export const findParent = (data: Family, graph: {adj: Member[][]}, nodeId: string) => Object.entries(graph.adj)
  .filter(([_, childs]: [string, Member[]]) => childs.includes(data.findMember(nodeId) as Member))
  .map(([parent, _]: [string, Member[]]) => findById(data, parseInt(parent)))

export const findGrandParent = (data: Family, graph: {adj: Member[][]},nodeId: string) => findParent(data, graph, nodeId).map(m => findParent(data, graph, m.member_id))

function assignOrdreOf(indexFamily: Family, family: Family, graph: Ordre): Family {
  return indexFamily.map(member => {
    if (member.member_id !== indexFamily.deCujus.member_id) {
      let grandParent = null as unknown as Member
      let parent = null as unknown as Member
      let deCujus = family.deCujus.member_id
      if (findParent(indexFamily, graph, deCujus)) {
        parent = findParent(indexFamily, graph, deCujus)[0]
      }
      if (findGrandParent(indexFamily, graph, deCujus)[0]) {
        grandParent = findGrandParent(indexFamily, graph, deCujus)[0][0]
      }
      return graph.assignOrdre(indexFamily.deCujus, member, indexFamily.root, parent, grandParent)
    } else {
      return member
    }
  })
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