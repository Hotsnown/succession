import { Status, Family, Member } from '../../entities'
import { withSpouse } from '../principe/withSpouse'

it('find who is the spouse', () => {

    const withSpouseMembers = [
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

    const family = Family.create(withSpouseMembers.map(member => Member.create(member)))

    family.members.map(c => console.log(c.attributes))
    expect(
        family
        .findSpouseOf("deCujus")
        .member_id)
        .toStrictEqual("spouse")
})

it('gives 100% to the spouse without descendants', () => {

    const withSpouseMembers = [
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

    const family = Family.create(withSpouseMembers.map(member => Member.create(member)))

    const solution = withSpouse(family)

    expect(
        solution.findMember("spouse")
        .legalRights)
        .toStrictEqual(1)

    expect(
        solution.findMember("deCujus")
        .legalRights)
        .toStrictEqual(0)

    expect(
        solution.findMember("grandParent")
        .legalRights)
        .toStrictEqual(0)
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

    const solution = withSpouse(family)

    expect(
        solution.findMember("spouse")
        .legalRights)
        .toStrictEqual(1/4)

    expect(
        solution.findMember("child")
        .legalRights)
        .toStrictEqual(3/4)

    expect(
        solution.findMember("deCujus")
        .legalRights)
        .toStrictEqual(0)

    expect(
        solution.findMember("grandParent")
        .legalRights)
        .toStrictEqual(0)
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

    const solution = withSpouse(family)

    const childOne = solution.findMember("child1")
    const spouse = solution.findMember("spouse")
    const childTwo = solution.findMember("child2")

    expect(
        spouse
        .legalRights)
        .toStrictEqual(1/4)

    expect(
        childOne
        .legalRights)
        .toStrictEqual(0.375)

    expect(
        childTwo
        .legalRights)
        .toStrictEqual(0.375)

    expect(
        childOne.legalRights +
        childTwo.legalRights +
        spouse.legalRights
    ).toStrictEqual(1)

    
    expect(
        solution.findMember("deCujus")
        .legalRights)
        .toStrictEqual(0)

    expect(
        solution.findMember("grandParent")
        .legalRights)
        .toStrictEqual(0)
})