import { Status, Family, Member } from '../../entities'
import { withSpouseController } from '../withSpouse'

it('find who is the spouse', () => {

    const withSpouseControllerMembers = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse":"spouse"
            },
            "member_id": "deCujus"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "deCujus"
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withSpouseControllerMembers.map(member => Member.create(member)))

    const spouseOfDeCujus = family.findSpouseOf('deCujus')

    expect(spouseOfDeCujus?.member_id).toStrictEqual("spouse")
})

it('gives 100% to the spouse without descendants', () => {

    const withSpouseControllerMembers = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse":"spouse"
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
            },
            "member_id": "grandParent"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "deCujus"
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withSpouseControllerMembers.map(member => Member.create(member)))
    const solution = withSpouseController(family)

    const spouse = solution.findMember('spouse')
    const deCujus = solution.findMember('deCujus')
    const grandParent = solution.findMember('grandParent')

    expect(spouse).toStrictEqual(1)
    expect(deCujus).toStrictEqual(0)
    expect(grandParent).toStrictEqual(0)
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
                "spouse":"spouse"
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
            },
            "member_id": "grandParent"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
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
                "spouse": "deCujus"
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withDescendantsMembers.map(member => Member.create(member)))

    const solution = withSpouseController(family)

    const spouse = solution.findMember('spouse')
    const child = solution.findMember('child')
    const deCujus = solution.findMember('deCujus')
    const grandParent = solution.findMember('grandParent')

    expect(spouse).toStrictEqual(1/4)
    expect(child).toStrictEqual(3/4)
    expect(deCujus).toStrictEqual(0)
    expect(grandParent).toStrictEqual(0)
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
                "spouse":"spouse"
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
            },
            "member_id": "grandParent"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
            },
            "member_id": "child1"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid,
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
                "spouse": "deCujus"
            },
            "member_id": "spouse"
        }
    ]

    const family = Family.create(withDescendantsMembers.map(member => Member.create(member)))

    const solution = withSpouseController(family)

    const childOne = solution.findMember("child1")!
    const spouse = solution.findMember("spouse")!
    const childTwo = solution.findMember("child2")!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!

    expect(spouse.legalRights).toStrictEqual(1/4)
    expect(childOne.legalRights).toStrictEqual(0.375)
    expect(childTwo.legalRights).toStrictEqual(0.375)
    expect(deCujus.legalRights).toStrictEqual(0)
    expect(grandParent.legalRights).toStrictEqual(0)
})