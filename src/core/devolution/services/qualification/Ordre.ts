import { Refine, Family, Member, Ordre as O } from '../../entities'

/**
 * Each node must be annotated with the ordre attribute, witch can take any of this values: 1 | 2 | 3 | 4 | 'outsider'.
 * - **Ordre1** : Given a deCujus, a node x belongs to ordre 1 if x is a descendant of the deCujus.
 * - **Ordre 2** : Given a deCujus, a node x belongs to ordre 2 if the LCA of x and deCujus is the mother/father of the deCujus
 * - **Ordre 3** : Given a deCujus, a node x belongs to ordre 3 if x is an ascendant of the deCujus.
 * - **Ordre 4** : Given a deCujus, a node x belongs to ordre 4 if the LCA of x and the deCujus is the grandparent/grand-grand-parent of the deCujus.
 */
export const assignOrdre: Refine = (family) => {

  const graph = new Ordre(family.members.length)
  const indexFamilyWithRoot = Family.create(family.indexMembers().members, family.deCujus.member_id, family.root.member_id)

  indexFamilyWithRoot.deCujus.attributes.ordre = 0
  indexFamilyWithRoot.findMember(indexFamilyWithRoot.deCujus.member_id).attributes.ordre = 0

  graph.buildGraph(indexFamilyWithRoot)

  return Family.create(
    indexFamilyWithRoot.members.map(member => {
    if (member.member_id !== indexFamilyWithRoot.deCujus.member_id) {      
      return assignOrdreOf(
        member, 
        graph,
        indexFamilyWithRoot)
    } else {
      return member
    }
  }), indexFamilyWithRoot.deCujus.member_id)
}

function assignOrdreOf(nodeToQualify: Member, graph: Ordre, family: Family): Member {
      
  //TODO : Ordre can not determine outsider and should not rely on degré
  if (nodeToQualify.attributes.degre === 'outsider') {
    return nodeToQualify.copyWith({ ordre: 'outsider' })
  }

  const LCA = graph.findLowestCommonAncestor(family.deCujus, nodeToQualify, family.root)

  if(!LCA) {
    console.error("LCA went null when trying to qualify Ordre")
    return nodeToQualify
  }

  if (isDescendant(LCA, family.deCujus)) {return nodeToQualify.copyWith({ ordre: O.Ordre1 })}
  else if (isPriviledgedCollateral(LCA, parentOfDeCujus(family), nodeToQualify)) {return nodeToQualify.copyWith({ ordre: O.Ordre2 })}
  else if (isAscendant(LCA, nodeToQualify)) {return nodeToQualify.copyWith({ ordre: O.Ordre3 })}
  else if (isCollateral(LCA, ancestorOfDeCujus(family), nodeToQualify)) {return nodeToQualify.copyWith({ ordre: O.Ordre4 })}
  else {
    nodeToQualify.attributes.ordre = 'outsider'
  }
  
  return nodeToQualify
}

function isDescendant(LCA: Member, deCujus: Member): boolean {
  return LCA.member_id === deCujus.member_id;
}

function isPriviledgedCollateral(LCA: Member, parents: Member[], nodeToQualify: Member): boolean {
  return parents.filter(member => member !== undefined).some(parent => LCA.member_id === parent.member_id && nodeToQualify.member_id !== parent.member_id);
}

function isAscendant(LCA: Member, nodeToQualify: Member): boolean {
  return LCA.member_id === nodeToQualify.member_id;
}

function isCollateral(LCA: Member, ancestors: Member[], nodeToQualify: Member): boolean {
  return ancestors.filter(ancestor => ancestor !== undefined).some(ancestor => LCA.member_id === ancestor.member_id && nodeToQualify.member_id !== ancestor.member_id);
}

function parentOfDeCujus(family: Family): Member[] {
  return family.findParentsOf(family.deCujus.member_id).filter(member => member !== undefined)
}


function ancestorOfDeCujus(family: Family): Member[] {
  const ancestors: Member[] = []

  function dfs(start: Member, visited = new Set<Member>()) {
    
    visited.add(start);

    if (!start) {
      return
    }

    const parents = family.findParentsOf(family.findMember(start.member_id).member_id);

    for (const parent of parents) {
        
        ancestors.push(parent)

        if (!visited.has(parent)) {
            dfs(parent, visited);
        }
    }
  }

  dfs(family.deCujus)

  return ancestors.filter(ancestor => ancestor !== undefined)
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

  public addEdge(src: Member, des: Member): void { 
      this.adj[src.index].push(des); 
  }

  public buildGraph(family: Family) {
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

  //TODO : on simpson's tree, when bart (or maggie) is the de cujus, [marge, unknown, mona, milhouse, ...] eg outsiders are
  //qualified as members of ordre 1.
  //TODO: on Ordre1's tree, when son is the de cujus, outsiders are qualified as members of ordre 4 and real ordre are not qualified
  // as members of ordre 4
  //TODO: on Ordre1's tree, when grandchildren3 is the decujus, outsiders are qualified as members of ordre 4
  //and members of ordre 2 are not qualified
  //TODO: on Ordre1's tree, when grandgrandchildren is the decujus, outsiders are qualified as ordre 1
  
  public findLowestCommonAncestor(deCujus: Member, nodeToQualify: Member, root: Member): Member {

    if (deCujus.member_id === root.member_id || nodeToQualify.member_id === root.member_id) return root;

    let count = 0;
    let ret: Member | null = null;

    for (let iter of this.adj[root.index]) {
      const res = this.findLowestCommonAncestor(deCujus, nodeToQualify, iter);
      if (res) {
        count++;
        ret = res;
      }
    }
    
    if (count === 2) return root;
      
    return ret as Member;
  }
}