import { Degré } from '../Degré'
import { Ordre, a, findParent, findGrandParent } from '../Ordre'
import { data } from './data'

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