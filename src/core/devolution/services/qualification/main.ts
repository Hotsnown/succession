import { Query } from "./Interface";
import { Degré } from './Degré'
import { Ordre, findByName, findParent, findGrandParent } from './Ordre'
import { MemberWithIndex as Member } from './Interface'

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
                graph.addEdge(member, findByName(data, child))
            }
        }
    })

    data.family.forEach(member => {
        if (member.member_id !== data.de_cujus) {
            graph.assignDegré(findByName(data, data.de_cujus), member)
        }
    })
}

function assignOrdre (data: Query, rootId: string) {

    const graph = new Ordre(data.family.length)

    data.family.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                graph.addEdge(member, findByName(data, child))
            }
        }
    })

    data.family.forEach(member => {
        if (member.member_id !== data.de_cujus) {
            let grandParent = null as unknown as Member
            let parent = null as unknown as Member

            if (findParent(data, graph, data.de_cujus)){
                parent = findParent(data, graph, data.de_cujus)[0]
            }
            if (findGrandParent(data, graph, data.de_cujus)[0]) {
                grandParent = findGrandParent(data, graph, data.de_cujus)[0][0]
            }
            graph.assignOrdre(
                findByName(data, data.de_cujus), 
                member, 
                findByName(data, rootId), 
                parent,
                grandParent
                )
        }
    })
}