import { Family, MemberConstructor } from '..'
import { Status } from '../Member'

const data: MemberConstructor[] = 
    [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":0, "ordre": 0, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        ]
/* 
it('should test map method', () => {
    
    const family = Family.create(data, "Bernard", "Bernard")
    const solution = family.map(member => member.copyWith({ status: 'invalid'}))

    expect(solution.members.every(member => member.attributes.status === Status.Deceased)).toBeTruthy()
})

it('should test filter method', () => {

    const family = Family.create(data, "Bernard", "Bernard")
    const solution = family.filter(member => member.attributes.degre === 0)

    expect(solution.members.every(member => member.member_id === 'Bernard')).toBeTruthy()
}) */

it('should create and read root', () => {
    const family = Family.create(data, "Bernard", "Bernard")
    expect(family.root.member_id).toStrictEqual("Bernard")  
})

it('should create and read deCujus', () => {
    const family = Family.create(data, "Bernard", "Bernard")
    expect(family.deCujus.member_id).toStrictEqual("Bernard")
    expect(family.deCujus.attributes.degre).toStrictEqual(0)
    expect(family.deCujus.attributes.ordre).toStrictEqual(0)
})

it('should find parents of deCujus', () => {
    const family = Family.create(data, "Bernard", "Bernard")
    
})