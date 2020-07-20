import { Refine, Family, Member } from '../../entities'

let min_num_of_edges: number
let edge_count: number

/**
 * Given the De Cujus and v, v’s degree is the minimum number of edges between the De Cujus and v.
 */
export const assignDegré: Refine = (family) =>  {

    const graph = new Degré(family.members.length)

    const indexFamily = family.indexMembers()

    buildGraph(indexFamily, graph)
    assignDegréOf(indexFamily, graph)

    return indexFamily
}

export class Degré {

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
        this.adj[des.index].push(src); 
    }

    assignDegré(deCujus: Member, nodeToQualify: Member): Member { 
        const visited = new Array(this.V).fill(false); 
        min_num_of_edges = 100; 
        edge_count = 0; 

        minEdgeDFSUtil(this, visited, deCujus, nodeToQualify);

        deCujus.attributes.degre = 0

        switch(min_num_of_edges) {
            case 1: {nodeToQualify.attributes.degre = 1; return nodeToQualify}
            case 2: {nodeToQualify.attributes.degre = 2; return nodeToQualify}
            case 3: {nodeToQualify.attributes.degre = 3; return nodeToQualify}
            case 4: {nodeToQualify.attributes.degre = 4; return nodeToQualify}
            case 5: {nodeToQualify.attributes.degre = 5; return nodeToQualify}
            case 6: {nodeToQualify.attributes.degre = 6; return nodeToQualify}
            case 100: {nodeToQualify.attributes.degre = 'outsider';  return nodeToQualify}
            default: {console.error(`Error: ${nodeToQualify.member_id} => ${min_num_of_edges} minimum number of edges`); return nodeToQualify}
        }
    }
}

function assignDegréOf(indexFamily: Family, graph: Degré) {
    indexFamily.members.forEach(member => {
        if (member.member_id !== indexFamily.deCujus.member_id) {
            graph.assignDegré(indexFamily.deCujus, member)
        }
    })
}

function buildGraph(indexFamily: Family, graph: Degré) {
    indexFamily.members.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                if (indexFamily.findMember(child)) {
                    graph.addEdge(member, indexFamily.findMember(child) as Member)
                }
                else {
                    console.error(`${child} has not been found.`)
                }
            }
        }
    })
}

function minEdgeDFSUtil(graph: Degré, visited: boolean[], src: Member, des: Member): void {
    visited[src.index] = true; 

    if (src.member_id === des.member_id) { 
        if (min_num_of_edges > edge_count) {
            min_num_of_edges = edge_count;
        }
    } else {
        for (let vertex of graph.adj[src.index]) { 
            if (!visited[vertex.index]) { 
                edge_count++; 
                minEdgeDFSUtil(graph, visited, vertex, des); 
            }
        }
    }

    visited[src.index] = false; 
    edge_count--; 
} 