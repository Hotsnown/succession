import { TreeNode } from '../TreeNode'
import { findByName } from '../../services/qualification/Ordre'
import { Query } from '../../services/qualification/Interface'

function stringify(list: TreeNode[] | undefined | null ) {
    if (list) {
     console.log(list.map(t => t.label).join(','))
    } else {
        console.log('')
    }
}
it.skip('should work on ordre 1', () => {
    const data: Query = {
        de_cujus: 'Bernard',
        family: [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 1},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 2},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 4},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 5},
        {"member_id":"Romeo","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 6},
        ]
    }

    const bernard = findByName(data, "Bernard")
    const fred = findByName(data, "Fred")
    const pierre = findByName(data, "Pierre")
    const claude = findByName(data, "Claude")
    const alphonse = findByName(data, "Alphonse")
    const leo = findByName(data, "Leo")
    const romeo = findByName(data, "Romeo")

    data.family.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(findByName(data, child).index, findByName(data, child).member_id, member.index)
            }
        }
    })

    expect(TreeNode.getTreeNode(fred.index)?.getDescendentPathTo(romeo.index)?.map(m => m.label)).toStrictEqual(['Fred','Pierre','Claude','Alphonse','Leo','Romeo'])
    expect(TreeNode.getTreeNode(romeo.index)?.getAncestorPathTo(fred.index)?.map(m => m.label)).toStrictEqual(['Fred','Pierre','Claude','Alphonse','Leo','Romeo'].reverse())
})

it('should work on ordre 2', () => {
    const data: Query = {
        de_cujus: 'Pierre',
        family: [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 0},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 1},
        {"member_id":"Marie","childs":["Gerard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 2},
        {"member_id":"Gerard","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 3},
        {"member_id":"Romeo","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 4},
        {"member_id":"Leo","childs":["Guillaume"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 5},
        {"member_id":"Guillaume","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 6}
        ]
    }

    data.family.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(findByName(data, child).index, findByName(data, child).member_id, member.index)
            }
        }
    })

    const pierre = findByName(data, "Pierre")
    const fred = findByName(data, "Fred")
    const marie = findByName(data, "Marie")
    const gerard = findByName(data, "Gerard")
    const romeo = findByName(data, "Romeo")
    const leo = findByName(data, "Leo")
    const guillaume = findByName(data, "Guillaume")

    expect(TreeNode.getTreeNode(marie.index)?.getDescendentPathTo(guillaume.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ])
    expect(TreeNode.getTreeNode(guillaume.index)?.getAncestorPathTo(marie.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ].reverse())
})

it('should work on ordre 3', () => {
    const data: Query = {
        de_cujus: 'Pierre',
        family: [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 2},
        {"member_id":"Leo","childs":["Bernard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 3},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 4},
        {"member_id":"Cody","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 5},
        {"member_id":"Etienne","childs":["Cody"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 6},
        ]
    }

    data.family.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(findByName(data, child).index, findByName(data, child).member_id, member.index)
            }
        }
    })

    const pierre = findByName(data, "Pierre")
    const fred = findByName(data, "Fred")
    const bernard = findByName(data, "Bernard")
    const leo = findByName(data, "Leo")
    const alphonse = findByName(data, "Alphonse")
    const cody = findByName(data, "Cody")
    const etienne = findByName(data, "Etienne")

    expect(TreeNode.getTreeNode(cody.index)?.getDescendentPathTo(pierre.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ])
    expect(TreeNode.getTreeNode(pierre.index)?.getAncestorPathTo(cody.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ].reverse())
})

it('should work on ordre 4', () => {
    const data: Query = {
        de_cujus: 'Pierre',
        family: [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 0},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 1},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 2},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 3},
        {"member_id": "Cody", "childs":[], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}, "index": 4},
        ]
    }

    const pierre = findByName(data, "Pierre")
    const fred = findByName(data, "Fred")
    const bernard = findByName(data, "Bernard")
    const claude = findByName(data, "Claude")
    const cody = findByName(data, "Cody")
    
})