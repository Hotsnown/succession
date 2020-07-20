import { Status, Family } from '../../../entities'
import { main } from '../main'

it('gives 100% to the spouse without descendants', () => {

    const withSpouseControllerMembers = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse":"spouse",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "deCujus"
        },
        {
            "childs": [
                "deCujus",
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "grandParent"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "deCujus",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withSpouseControllerMembers)
    const solution = main(family, 'deCujus')

    const spouse = solution.findMember('spouse')!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
})

it('gives 25% to the spouse with descendants', () => {

    const withDescendantsMembers = [
        {
            "childs": [
                "child"
            ],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse":"spouse",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "deCujus"
        },
        {
            "childs": [
                "deCujus",
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid,
                "spouse": '',
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "grandParent"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "child"
        },
        {
            "childs": [
                "child"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "deCujus",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withDescendantsMembers)

    const solution = main(family, 'deCujus')

    const spouse = solution.findMember('spouse')!
    const child = solution.findMember('child')!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1/4)
    expect(child.legalRights.valueOf()).toStrictEqual(3/4)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
})

it('gives equal shares to all descendants', () => {

    const withDescendantsMembers = [
        {
            "childs": [
                "child1",
                "child2",
            ],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse":"spouse",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "deCujus"
        },
        {
            "childs": [
                "deCujus",
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "grandParent"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "child1"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "child2"
        },
        {
            "childs": [
                "child1",
                "child2",
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "deCujus",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withDescendantsMembers)

    const solution = main(family, 'deCujus')

    const childOne = solution.findMember("child1")!
    const spouse = solution.findMember("spouse")!
    const childTwo = solution.findMember("child2")!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1/4)
    expect(childOne.legalRights.valueOf()).toStrictEqual(0.375)
    expect(childTwo.legalRights.valueOf()).toStrictEqual(0.375)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
})

it('should work with deceased descendants', () => {
    const withDeceasedDescendantsMembers = [
        {
            "childs": [
                "deceasedChild",
                "child",
            ],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse":"spouse",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "deCujus"
        },
        {
            "childs": [
                "deCujus",
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "grandParent"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "deceasedChild"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "child"
        },
        {
            "childs": [
                "deceasedChild",
                "child",
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "deCujus",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withDeceasedDescendantsMembers)

    const solution = main(family, 'deCujus')

    const child = solution.findMember("child")!
    const spouse = solution.findMember("spouse")!
    const deceasedChild = solution.findMember("deceasedChild")!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1/4)
    expect(child.legalRights.valueOf()).toStrictEqual(3/4)
    expect(deceasedChild.legalRights.valueOf()).toStrictEqual(0)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
})

it.skip('should work with representation', () => {
    const withDeceasedDescendantsMembers = [
        {
            "childs": [
                "deceasedChild",
                "child",
            ],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse":"spouse",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "deCujus"
        },
        {
            "childs": [
                "deCujus",
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "grandParent"
        },
        {
            "childs": [
                "representant"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "deceasedChild"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "representant"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "child"
        },
        {
            "childs": [
                "deceasedChild",
                "child",
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "deCujus",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withDeceasedDescendantsMembers)

    const solution = main(family, 'deCujus')

    const child = solution.findMember("child")!
    const spouse = solution.findMember("spouse")!
    const deceasedChild = solution.findMember("deceasedChild")!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!
    const representant = solution.findMember('representant')!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1/4)
    expect(child.legalRights.valueOf()).toStrictEqual(3/8)
    expect(deceasedChild.legalRights.valueOf()).toStrictEqual(0)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
    expect(representant.legalRights.valueOf()).toStrictEqual(3/8)
})