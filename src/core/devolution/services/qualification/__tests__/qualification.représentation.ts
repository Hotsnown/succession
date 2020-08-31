import { Status, Family, MemberConstructor } from  '../../../entities'
import { assignRepresentation } from '../Représentation'

it('should not be appliable when members doesnt belong do Ordre 1', () => {
    const secondOrdreMembers: MemberConstructor[] = [
        {"childs": [], "attributes": { "degre": 0, "ordre": 0, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "maggie" },
        { "childs": [ "bart", "lisa", "maggie" ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "homer" }
    ]

    const family = Family.create(secondOrdreMembers, 'homer')
    const {members} = assignRepresentation(family)

    expect(members
        .filter(member => member.isReprésenté))
        .toHaveLength(0)
})

it('should not be appliable when members are not parent with the représenté', () => {
    const unrelatedMembers: MemberConstructor[] = [
        { "childs": [ "homer", "maggie", "alphonse" ], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "abe" }, 
        { "childs": [ "gerard", "mathieu" ], "attributes": { "degre": 1, "ordre": 1, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "homer" }, 
        { "childs": [], "attributes": { "degre": 2, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "alphonse" }, 
        { "childs": [], "attributes": { "degre": 2, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "maggie" }, 
    ]

    const family = Family.create(unrelatedMembers, 'abe')
    const {members} = assignRepresentation(family)

    expect(members
        .filter(member => member.isReprésenté))
        .toHaveLength(0)

    expect(members
        .filter(member => member.isReprésentant))
        .toHaveLength(0)
})

it('should not work when a potential représentant' +
    'is not eligible for inheritance', () => {
    const deadAlphonse: MemberConstructor[] = [
        { "childs": [ "homer" ], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "abe" }, 
        { "childs": [ "alphonse", ], "attributes": { "degre": 1, "ordre": 1, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "homer" }, 
        { "childs": ["theo"], "attributes": { "degre": 2, "ordre": 1, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "alphonse" }, 
        { "childs": [], "attributes": { "degre": 3, "ordre": 1, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "theo" }, 
    ]

    const family = Family.create(deadAlphonse, 'abe')
    const solution = assignRepresentation(family)

    const alphonse = solution.findMember('alphonse')
    const theo = solution.findMember('theo')
    expect(alphonse?.isReprésentant).toBeFalsy()
    expect(alphonse.isReprésenté).toBeTruthy()

    expect(theo.isReprésentant).toBeTruthy()
    expect(theo.isReprésenté).toBeFalsy()

})

it('should be appliable when members are child of a sibling', () => {
    const firstOrderMembers: MemberConstructor[] = [
        { "childs": [ "homer", "sibling" ], "attributes": { "degre": 1, "ordre": 2, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "abe" }, 
        { "childs": [], "attributes": { "degre": 0, "ordre": 0, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "homer" }, 
        { "childs": [], "attributes": { "degre": 2, "ordre": 2, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "validSibling" }, 
        { "childs": ["nephew"], "attributes": { "degre": 2, "ordre": 2, "status": Status.Deceased, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "deadSibling" }, 
        { "childs": [], "attributes": { "degre": 3, "ordre": 2, "status": Status.Valid, "spouse": [''], "legalRights": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned",  "index": "unassigned", }, "member_id": "nephew"}, 
    ]

    const family = Family.create(firstOrderMembers, 'abe')
    const solution = assignRepresentation(family)

    const nephew = solution.findMember('nephew')
    const deadSibling = solution.findMember('deadSibling')

    expect(nephew?.isReprésentant).toBeTruthy()
    expect(deadSibling?.isReprésenté).toBeTruthy()
})