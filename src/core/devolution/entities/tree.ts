import { TreeNode } from '../TreeNode'
import { MemberConstructor } from '../Member'
import { Family } from '../Family'

it.skip('should get node level', () => {
    const data: MemberConstructor[] = 
    [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
    ]

    const family = Family.create(data).indexMembers()

    family.members.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(
                    family.findMember(child)!.index, 
                    family.findMember(child)!.member_id, 
                    member.index
                    )
            }
        }
    })

    const bernard = TreeNode.getTreeNode(family.findMember('Bernard')!.index)!
    const fred = TreeNode.getTreeNode(family.findMember('Fred')!.index)!
    const pierre = TreeNode.getTreeNode(family.findMember('Pierre')!.index)!
    const claude = TreeNode.getTreeNode(family.findMember('Claude')!.index)!
    const alphonse = TreeNode.getTreeNode(family.findMember('Alphonse')!.index)!
    const leo = TreeNode.getTreeNode(family.findMember('Leo')!.index)!
    const romeo = TreeNode.getTreeNode(family.findMember('Romeo')!.index)!

    expect(bernard?.getLevel()).toStrictEqual(undefined)
    expect(fred?.getLevel()).toStrictEqual(0)
    expect(pierre?.getLevel()).toStrictEqual(1)
    expect(claude?.getLevel()).toStrictEqual(2)
    expect(alphonse?.getLevel()).toStrictEqual(3)
    expect(leo?.getLevel()).toStrictEqual(4)
    expect(romeo?.getLevel()).toStrictEqual(5)

    expect(pierre.isChildOf(fred)).toBeTruthy()
    expect(alphonse.isChildOf(leo)).toBeFalsy()
    expect(leo.isChildOf(fred)).toBeTruthy()
})

it.skip('should work on ordre 1', () => {
    const data: MemberConstructor[] = 
    [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
    ]

    const family = Family.create(data).indexMembers()

    const bernard = family.findMember('Bernard')
    const fred = family.findMember('Fred')
    const pierre = family.findMember('Pierre')
    const claude = family.findMember("Claude")
    const alphonse = family.findMember("Alphonse")
    const leo = family.findMember("Leo")
    const romeo = family.findMember("Romeo")

    family.members.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(
                    family.findMember(child)?.index as unknown as number, 
                    family.findMember(child)?.member_id as unknown as string, 
                    member.index)
            }
        }
    })

    expect(TreeNode.getTreeNode(fred?.index as unknown as number)?.getDescendentPathTo(romeo?.index as unknown as number)?.map(m => m.label)).toStrictEqual(['Fred','Pierre','Claude','Alphonse','Leo','Romeo'])
    expect(TreeNode.getTreeNode(romeo?.index as unknown as number)?.getAncestorPathTo(fred?.index as unknown as number)?.map(m => m.label)).toStrictEqual(['Fred','Pierre','Claude','Alphonse','Leo','Romeo'].reverse())
})

it.skip('should work on ordre 2', () => {
    const data: MemberConstructor[] = 
    [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Marie","childs":["Gerard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Gerard","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Guillaume"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Guillaume","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}}
    ]

    const family = Family.create(data).indexMembers()

    family.members.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(family.findMember(child)!.index, family.findMember(child)!.member_id, member.index)
            }
        }
    })

    const pierre = family.findMember("Pierre")!
    const fred = family.findMember("Fred")!
    const marie = family.findMember("Marie")!
    const gerard = family.findMember("Gerard")!
    const romeo = family.findMember("Romeo")!
    const leo = family.findMember("Leo")!
    const guillaume = family.findMember("Guillaume")!

    expect(TreeNode.getTreeNode(marie.index)?.getDescendentPathTo(guillaume.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ])
    expect(TreeNode.getTreeNode(guillaume.index)?.getAncestorPathTo(marie.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ].reverse())
})

it.skip('should work on ordre 3', () => {
    const data: MemberConstructor[] = 
    [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Bernard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Cody","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Etienne","childs":["Cody"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
    ]

    const family = Family.create(data).indexMembers()

    family.members.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(family.findMember(child)!.index, family.findMember(child)!.member_id, member.index)
            }
        }
    })

    const pierre = family.findMember("Pierre")!
    const fred = family.findMember("Fred")!
    const bernard = family.findMember("Bernard")!
    const leo = family.findMember("Leo")!
    const alphonse = family.findMember("Alphonse")!
    const cody = family.findMember("Cody")!
    const etienne = family.findMember("Etienne")!

    expect(TreeNode.getTreeNode(pierre.index)?.getAncestorPathTo(cody.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ].reverse())
    expect(TreeNode.getTreeNode(cody.index)?.getDescendentPathTo(etienne.index)?.map(m => m.label)).toStrictEqual(['Marie', 'Gerard', 'Romeo', 'Leo', 'Guillaume' ])
})

it.skip('should work on ordre 4', () => {
    const data: MemberConstructor[] = 
    [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Cody", "childs":[], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
    ]

    const family = Family.create(data).indexMembers()

    family.members.forEach(member => {
        if (member.childs) {
            for (let child of member.childs) {
                TreeNode.create(family.findMember(child)!.index, family.findMember(child)!.member_id, member.index)
            }
        }
    })

    const pierre = family.findMember("Pierre")!
    const fred = family.findMember("Fred")!
    const bernard = family.findMember("Bernard")!
    const claude = family.findMember("Claude")!
    const cody = family.findMember("Cody")!

    expect(TreeNode.getTreeNode(fred.index)?.getDescendentPathTo(bernard.index)?.map(m => m.label)).toStrictEqual([])
})