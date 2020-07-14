import { Degré } from '../Degré'
import { Ordre, a, findParent, findGrandParent } from '../Ordre'
import { data } from './data'
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

