import { Degré } from '../Degré'
import { findByName } from '../Ordre'
import { data } from './data'
import { Query } from '../Interface'
it('should test degrés', () => {

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

    expect(findByName(data, 'Fred').attributes.degre).toStrictEqual(1)
    expect(findByName(data, 'Marie').attributes.degre).toStrictEqual(2)
    expect(findByName(data, 'Bernard').attributes.degre).toStrictEqual(2)
    expect(findByName(data, 'Bea').attributes.degre).toStrictEqual(3)
    expect(findByName(data, 'Armand').attributes.degre).toStrictEqual(4)
})


it('should test degrés in ordre 1', () => {
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

    const target = [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": "valid", 'degre':0, 'ordre': 'unassigned'}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": "valid", 'degre': 1, 'ordre': 'unassigned'}, "index": 1},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": "valid", 'degre': 2, 'ordre': 'unassigned'}, "index": 2},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": "valid", 'degre': 3, 'ordre': 'unassigned'}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": "valid", 'degre': 4, 'ordre': 'unassigned'}, "index": 4},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": "valid", 'degre': 5, 'ordre': 'unassigned'}, "index": 5},
        {"member_id":"Romeo","childs":[],"attributes":{"status": "valid", 'degre': 6, 'ordre': 'unassigned'}, "index": 6}
        ]

    expect(data.family).toStrictEqual(target)

})

it('should test degrés in ordre 2', () => {
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
    const target = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": "valid", 'degre': 0, 'ordre': 'unassigned'}, "index": 0},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": "valid", 'degre': 1, 'ordre': 'unassigned'}, "index": 1},
        {"member_id":"Marie","childs":["Gerard"],"attributes":{"status": "valid", 'degre': 2, 'ordre': 'unassigned'}, "index": 2},
        {"member_id":"Gerard","childs":["Romeo"],"attributes":{"status": "valid", 'degre': 3, 'ordre': 'unassigned'}, "index": 3},
        {"member_id":"Romeo","childs":["Leo"],"attributes":{"status": "valid", 'degre': 4, 'ordre': 'unassigned'}, "index": 4},
        {"member_id":"Leo","childs":["Guillaume"],"attributes":{"status": "valid", 'degre': 5, 'ordre': 'unassigned'}, "index": 5},
        {"member_id":"Guillaume","childs":[],"attributes":{"status": "valid", 'degre': 6, 'ordre': 'unassigned'}, "index": 6}
        ]

        expect(data.family).toStrictEqual(target)

})

it('should test degrés in ordre 3', () => {
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

    const target = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": "valid", 'degre': 0, 'ordre': 'unassigned'}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": "valid", 'degre': 1, 'ordre': 'unassigned'}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": "valid", 'degre': 2, 'ordre': 'unassigned'}, "index": 2},
        {"member_id":"Leo","childs":["Bernard"],"attributes":{"status": "valid", 'degre': 3, 'ordre': 'unassigned'}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": "valid", 'degre': 4, 'ordre': 'unassigned'}, "index": 4},
        {"member_id":"Cody","childs":["Alphonse"],"attributes":{"status": "valid", 'degre': 5, 'ordre': 'unassigned'}, "index": 5},
        {"member_id":"Etienne","childs":["Cody"],"attributes":{"status": "valid", 'degre': 6, 'ordre': 'unassigned'}, "index": 6},
        ]

        expect(data.family).toStrictEqual(target)

})

it('should test degrés in ordre 4', () => {
    const data: Query = {
        de_cujus: 'Pierre',
        family: [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 2},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 3},
        {"member_id": "Cody", "childs":[], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned"}, "index": 4},
        ]}


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

    const target = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', 'degre': 0, 'ordre': 'unassigned'}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', 'degre': 1, 'ordre': 'unassigned'}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', 'degre': 2, 'ordre': 'unassigned'}, "index": 2},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', 'degre': 3, 'ordre': 'unassigned'}, "index": 3},
        {"member_id": "Cody", "childs":[], "attributes": {"status": 'valid', 'degre': 4, 'ordre': 'unassigned'}, "index": 4},
        ]

        expect(data.family).toStrictEqual(target)

})