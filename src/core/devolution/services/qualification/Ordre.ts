import { Member, Query } from './Interface'

export class Ordre 
{ 
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

    assignOrdre(deCujus: Member, nodeToQualify: Member, root: Member, parent: Member, grandParent: Member): Member {
      
      const LCA = this.LCAutil(deCujus, nodeToQualify, root)
            
      deCujus.attributes.ordre = 0

      if (LCA.member_id === deCujus.member_id) {nodeToQualify.attributes.ordre = 1; return nodeToQualify}
      if (LCA.member_id === parent.member_id && nodeToQualify.member_id !== parent.member_id) {nodeToQualify.attributes.ordre = 2; return nodeToQualify}
      if (LCA.member_id === nodeToQualify.member_id) {nodeToQualify.attributes.ordre = 3; return nodeToQualify}
      if (LCA.member_id === grandParent.member_id && nodeToQualify.member_id !== grandParent.member_id) {nodeToQualify.attributes.ordre = 4; return nodeToQualify}
      
      nodeToQualify.attributes.ordre = 'outsider'
      return nodeToQualify
    }

    private LCAutil(a: Member, b: Member, root: Member): Member {
      
      if (a.member_id === root.member_id || b.member_id === root.member_id) return root;

      let count = 0;
      let temp: Member | null = null;

      for (let iter of this.adj[root.index]) {
        const res = this.LCAutil(a, b, iter);
        if (res != null) {
          count++;
          temp = res;
        }
      }
      
      if (count == 2) return root;
        
      return temp as Member;
    }
}

export const a = (data: Query, memberId: string): Member => data.family.find(member => member.member_id === memberId)! || console.error(`${memberId} has not been found`)
export const b = (data: Query, index: number): Member => data.family.find(member => member.index === index)! || console.error(`${index} has not been found`)

export const findParent = (data: Query, graph: {adj: Member[][]}, nodeId: string) => Object.entries(graph.adj)
  .filter(([_, childs]: [string, Member[]]) => childs.includes(a(data, nodeId)))
  .map(([parent, _]: [string, Member[]]) => b(data, parseInt(parent)))

export const findGrandParent = (data: Query, graph: {adj: Member[][]},nodeId: string) => findParent(data, graph, nodeId).map(m => findParent(data, graph, m.member_id))