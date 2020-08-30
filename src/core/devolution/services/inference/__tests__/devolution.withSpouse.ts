import { Status, Family, MemberConstructor } from '../../../entities'
import { getDevolution } from '../main'

it('should not go with the with spouse strategy when spouse is ineligible to inherit', () => {
    const withSpouse: MemberConstructor[] = [
        { "member_id": "deCujus", "childs": ["child"], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse":["spouse"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "child", "childs": [ "deCujus", ], "attributes": { "degre": 1, "ordre": 1, "status": Status.Valid, "spouse": [""], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "spouse",  "childs": ["child"], "attributes": { "degre": 1, "ordre": 2, "status": Status.Deceased, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}
    ]

    const family = Family.create(withSpouse, 'deCujus')
    const solution = getDevolution(family)

    const spouse = solution.findMember('spouse')
    const deCujus = solution.findMember('deCujus')
    const child = solution.findMember('child')

    expect(spouse.attributes.legalRights.valueOf()).toStrictEqual(0)
    expect(deCujus.attributes.legalRights.valueOf()).toStrictEqual(0)
    expect(child.attributes.legalRights.valueOf()).toStrictEqual(1)
})

it('gives 100% to the spouse without descendants', () => {

    const withSpouse: MemberConstructor[] = [
        { "member_id": "deCujus", "childs": [], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse":["spouse"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "grandParent", "childs": [ "deCujus", ], "attributes": { "degre": 2, "ordre": 3, "status": Status.Valid, "spouse": [""], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "spouse",  "childs": [], "attributes": { "degre": 1, "ordre": 2, "status": Status.Valid, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}
    ]

    const family = Family.create(withSpouse, 'deCujus')
    const solution = getDevolution(family)

    const spouse = solution.findMember('spouse')!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
})

it('gives 25% to the last eligible to inherit spouse with descendants', () => {

    const withDescendantsMembers: MemberConstructor[] = [
        { "member_id": "deCujus", "childs": [ "child" ], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse":["lastSpouse", "deceasedSpouse"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", } }, 
        { "member_id": "grandParent", "childs": [ "deCujus", ], "attributes": { "degre": 2, "ordre": 3, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "child", "childs": [], "attributes": { "degre": 1, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "lastSpouse", "childs": [ "child" ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Valid, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }},
        { "member_id": "deceasedSpouse", "childs": [ "child" ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Deceased, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}
    ]

    const family = Family.create(withDescendantsMembers, 'deCujus')

    const solution = getDevolution(family)

    const lastSpouse = solution.findMember('lastSpouse')!
    const deceasedSpouse = solution.findMember('deceasedSpouse')
    const child = solution.findMember('child')!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!

    expect(lastSpouse.legalRights.valueOf()).toStrictEqual(1/4)
    expect(deceasedSpouse.legalRights.valueOf()).toStrictEqual(0)
    expect(child.legalRights.valueOf()).toStrictEqual(3/4)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
})

it('gives equal shares to all descendants', () => {

    const withDescendantsMembers: MemberConstructor[] = [
        { "member_id": "deCujus", "childs": [ "child1", "child2", ], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse":["spouse"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "grandParent", "childs": [ "deCujus", ], "attributes": { "degre": 2, "ordre": 3, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "child1", "childs": [], "attributes": { "degre": 1, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "child2", "childs": [], "attributes": { "degre": 1, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "spouse", "childs": [ "child1", "child2", ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Valid, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}
    ]

    const family = Family.create(withDescendantsMembers, 'deCujus')

    const solution = getDevolution(family)

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
    const withDeceasedDescendantsMembers: MemberConstructor[] = [
        { "member_id": "deCujus", "childs": [ "deceasedChild", "child", ], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse":["spouse"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "grandParent", "childs": [ "deCujus", ], "attributes": { "degre": 2, "ordre": 3, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "deceasedChild", "childs": [ "représentant" ], "attributes": { "degre": 1, "ordre": 1, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "child", "childs": [], "attributes": { "degre": 1, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "spouse", "childs": [ "deceasedChild", "child", ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Valid, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}
    ]

    const family = Family.create(withDeceasedDescendantsMembers, 'deCujus')

    const solution = getDevolution(family)

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

it('should give all rights to the spouse when all descendants are dead', () => {
    const withDeceasedDescendantsMembers: MemberConstructor[] = [
        { "member_id": "deCujus", "childs": [ "deceasedChild1", "deceasedChild2", ], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse":["spouse"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "deceasedChild1", "childs": [ "représentant" ], "attributes": { "degre": 1, "ordre": 1, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "deceasedChild2", "childs": [], "attributes": { "degre": 1, "ordre": 1, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "spouse", "childs": [ "deceasedChild", "deceasedChild2", ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Valid, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}
    ]

    const family = Family.create(withDeceasedDescendantsMembers, 'deCujus')

    const solution = getDevolution(family)

    const deCujus = solution.findMember('deCujus')
    const deceasedChild1 = solution.findMember("deceasedChild1")!
    const spouse = solution.findMember("spouse")!
    const deceasedChild2 = solution.findMember("deceasedChild2")!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1)
    expect(deceasedChild1.legalRights.valueOf()).toStrictEqual(0)
    expect(deceasedChild2.legalRights.valueOf()).toStrictEqual(0)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
})

it.skip('should work with representation', () => {
    const withReprésentation: MemberConstructor[] = [
        { "member_id": "deCujus", "childs": [ "représenté", "child", ], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse":["spouse"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "grandParent", "childs": [ "deCujus", ], "attributes": { "degre": 2, "ordre": 3, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "représenté", "childs": [ "representant" ], "attributes": { "degre": 1, "ordre": 1, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "representant", "childs": [], "attributes": { "degre": 2, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "child", "childs": [], "attributes": { "degre": 1, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}, 
        { "member_id": "spouse", "childs": [ "représenté", "child", ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Valid, "spouse": ["deCujus"], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", }}
    ]

    const family = Family.create(withReprésentation, 'deCujus')

    const solution = getDevolution(family)

    const child = solution.findMember("child")!
    const spouse = solution.findMember("spouse")!
    const représenté = solution.findMember("représenté")!
    const deCujus = solution.findMember('deCujus')!
    const grandParent = solution.findMember('grandParent')!
    const representant = solution.findMember('representant')!

    expect(spouse.legalRights.valueOf()).toStrictEqual(1/4)
    expect(child.legalRights.valueOf()).toStrictEqual(3/8)
    expect(représenté.legalRights.valueOf()).toStrictEqual(0)
    expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
    expect(grandParent.legalRights.valueOf()).toStrictEqual(0)
    expect(representant.legalRights.valueOf()).toStrictEqual(3/8)
})