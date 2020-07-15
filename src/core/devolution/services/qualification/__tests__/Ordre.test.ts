import { Degré } from '../Degré'
import { Ordre, a, findParent, findGrandParent } from '../Ordre'
import { data } from './data'
import { Member, Query } from '../Interface'

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

it('should test ordre 1', () => {
    const data: Query = {
        de_cujus: 'Bernard',
        family: [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 1},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 2},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 4},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 5},
        {"member_id":"Romeo","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 6},
        ]
    }

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

    const target = [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": "valid", 'degre':'unassigned', 'ordre': 0}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 1}, "index": 1},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 1}, "index": 2},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 1}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 1}, "index": 4},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 1}, "index": 5},
        {"member_id":"Romeo","childs":[],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 1}, "index": 6}
        ]

    expect(data.family).toStrictEqual(target)

})

it('should test ordre 2', () => {
    const data: Query = {
        de_cujus: 'Pierre',
        family: [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 0},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 1},
        {"member_id":"Marie","childs":["Gerard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 2},
        {"member_id":"Gerard","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 3},
        {"member_id":"Romeo","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 4},
        {"member_id":"Leo","childs":["Guillaume"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 5},
        {"member_id":"Guillaume","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 6}
        ]
    }


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
            graph.assignOrdre(a(data, data.de_cujus), member, a(data, 'Fred'), findParent(data, graph, data.de_cujus)[0], findGrandParent(data, graph, data.de_cujus)[0][0])
        }
    })

    const target = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 0}, "index": 0},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 3}, "index": 1},
        {"member_id":"Marie","childs":["Gerard"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 2}, "index": 2},
        {"member_id":"Gerard","childs":["Romeo"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 2}, "index": 3},
        {"member_id":"Romeo","childs":["Leo"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 2}, "index": 4},
        {"member_id":"Leo","childs":["Guillaume"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 2}, "index": 5},
        {"member_id":"Guillaume","childs":[],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 2}, "index": 6}
        ]

    expect(data.family).toStrictEqual(target)
})

it('should test ordre 3', () => {
    const data: Query = {
        de_cujus: 'Pierre',
        family: [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 2},
        {"member_id":"Leo","childs":["Bernard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 4},
        {"member_id":"Cody","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 5},
        {"member_id":"Etienne","childs":["Cody"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 6},
        ]}

    
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
                graph.assignOrdre(a(data, data.de_cujus), member, a(data, 'Bernard'), findParent(data, graph, data.de_cujus)[0], findGrandParent(data, graph, data.de_cujus)[0][0])
            }
        })

    const target = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 0}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 3}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 3}, "index": 2},
        {"member_id":"Leo","childs":["Bernard"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 3}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 3}, "index": 4},
        {"member_id":"Cody","childs":["Alphonse"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 3}, "index": 5},
        {"member_id":"Etienne","childs":["Cody"],"attributes":{"status": "valid", 'degre': 'unassigned', 'ordre': 3}, "index": 6},
        ]

        expect(data.family).toStrictEqual(target)

})

it('should test ordre 4', () => {
    const data: Query = {
        de_cujus: 'Pierre',
        family: [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 2},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 3},
        {"member_id": "Cody", "childs":[], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 4},
        ]}


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

    const target = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', 'degre': 'unassigned', 'ordre': 0}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', 'degre': 'unassigned', 'ordre': 2}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', 'degre': 'unassigned', 'ordre': 3}, "index": 2},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', 'degre': 'unassigned', 'ordre': 3}, "index": 3},
        {"member_id": "Cody", "childs":[], "attributes": {"status": 'valid', 'degre': 'unassigned', 'ordre': 4}, "index": 4},
        ]

    expect(data.family).toStrictEqual(target)
})