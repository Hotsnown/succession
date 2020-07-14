import { Query } from "./Interface";
import { Degré } from './Degré'
import { Ordre, a, findParent, findGrandParent } from './Ordre'

export function main (data: Query, rootId: string): Query {
    assignDegré(data, rootId)
    assignOrdre(data, rootId)
    return data
}

function assignDegré (data: Query, rootId: string) {

    const graph = new Degré(data.family.length)
    
    data.family.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                graph.addEdge(member, a(data, child))
            }
        }
    })

    data.family.forEach(member => {
        if (member.member_id !== data.de_cujus) {
            graph.assignDegré(a(data, data.de_cujus), member)
        }
    })
}

function assignOrdre (data: Query, rootId: string) {

    const graph = new Ordre(data.family.length)

    data.family.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                graph.addEdge(member, a(data, child))
            }
        }
    })

    data.family.forEach(member => {
        if (member.member_id !== data.de_cujus) {
            graph.assignOrdre(
                a(data, data.de_cujus), 
                member, 
                a(data, rootId), 
                findParent(data, graph, data.de_cujus)[0], 
                findGrandParent(data, graph, data.de_cujus)[0][0]
                )
        }
    })
}