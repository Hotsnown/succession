import { Query } from '../Interface'
import { Degré } from '../Degré'
import { Ordre, a, findParent, findGrandParent } from '../Ordre'

const data: Query = {
    "de_cujus":"Pierre",
    "family":[
        {"member_id":"Pierre","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 0},
        {"member_id":"Marie","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 1},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 2},
        {"member_id":"Bea","childs":["Armand","Morgane","Thibault","Romain"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 3},
        {"member_id":"Armand","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 4},
        {"member_id":"Morgane","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 5},
        {"member_id":"Thibault","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 6},
        {"member_id":"Romain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 7},
        {"member_id":"Sylvain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 8},
        {"member_id":"Steph","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 9},
        {"member_id":"Bernard","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 10},
        {"member_id":"Claudine","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 11}
    ]
}

it('should test degrés', () => {

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

    expect(a(data, 'Fred').attributes.degre).toStrictEqual(1)
    expect(a(data, 'Marie').attributes.degre).toStrictEqual(2)
    expect(a(data, 'Bernard').attributes.degre).toStrictEqual(2)
    expect(a(data, 'Bea').attributes.degre).toStrictEqual(3)
    expect(a(data, 'Armand').attributes.degre).toStrictEqual(4)
})

it('should test ordre', () => {

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
            graph.assignOrdre(a(data, data.de_cujus), member, a(data, 'Bernard'), findParent(data, graph, 'Pierre')[0], findGrandParent(data, graph, 'Pierre')[0][0])
        }
    })

    expect(a(data, 'Marie').attributes.ordre).toStrictEqual(2)
    expect(a(data, 'Fred').attributes.ordre).toStrictEqual(3)
    expect(a(data, 'Bernard').attributes.ordre).toStrictEqual(3)
    expect(a(data, 'Bea').attributes.ordre).toStrictEqual(4)
    expect(a(data, 'Armand').attributes.ordre).toStrictEqual(4)
})