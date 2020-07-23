import { Degré, assignDegré } from '../Degré'
import { Family, Degree, MemberConstructor } from '../../../entities'

it('should test degrés in ordre 1', () => {
    const data: MemberConstructor[] =  [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        ]

    const solution = assignDegré(Family.create(data))

    const bernard = solution.findMember('Bernard')!
    const fred = solution.findMember('Fred')!
    const pierre = solution.findMember('Pierre')!
    const claude = solution.findMember('Claude')
    const alphonse = solution.findMember('Alphonse')!
    const leo = solution.findMember('Leo')!
    const romeo = solution.findMember('Romeo')!

    expect(bernard.attributes.degre).toStrictEqual(0)
    expect(fred.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(pierre.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(claude.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(alphonse.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(leo.attributes.degre).toStrictEqual(Degree.Degree5)
    expect(romeo.attributes.degre).toStrictEqual(Degree.Degree6)
})

it('should test degrés in ordre 2', () => {
    const data: MemberConstructor[] = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Marie","childs":["Gerard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Gerard","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Guillaume"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Guillaume","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}}
        ]

    const solution = assignDegré(Family.create(data))

    const bernard = solution.findMember('Bernard')!
    const fred = solution.findMember('Fred')!
    const marie = solution.findMember('Marie')!
    const gerard = solution.findMember('Gerard')!
    const romeo = solution.findMember('Romeo')!
    const leo = solution.findMember('Leo')!
    const guillaume = solution.findMember('Guillaume')!

    expect(bernard.attributes.degre).toStrictEqual(0)
    expect(fred.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(marie.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(gerard.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(romeo.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(leo.attributes.degre).toStrictEqual(Degree.Degree5)
    expect(guillaume.attributes.degre).toStrictEqual(Degree.Degree6)
})

it('should test degrés in ordre 3', () => {
    const data: MemberConstructor[] = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Bernard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Cody","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Etienne","childs":["Cody"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        ]

    const solution = assignDegré(Family.create(data))

    const pierre = solution.findMember('Pierre')!
    const fred = solution.findMember('Fred')!
    const bernard = solution.findMember('Bernard')!
    const leo = solution.findMember('Leo')!
    const alphonse = solution.findMember('Alphonse')!
    const cody = solution.findMember('Cody')!
    const etienne = solution.findMember('Etienne')!

    expect(pierre.attributes.degre).toStrictEqual(0)
    expect(fred.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(bernard.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(leo.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(alphonse.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(cody.attributes.degre).toStrictEqual(Degree.Degree5)
    expect(etienne.attributes.degre).toStrictEqual(Degree.Degree6)
})

it('should test degrés in ordre 4', () => {
    const data: MemberConstructor[] = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Cody", "childs":[], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Vincent", "childs":[], "attributes": {"status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        ]


    const solution = assignDegré(Family.create(data))

    const pierre = solution.findMember('Pierre')!
    const fred = solution.findMember('Fred')!
    const bernard = solution.findMember('Bernard')!
    const claude = solution.findMember('Claude')!
    const cody = solution.findMember('Cody')!
    const vincent = solution.findMember('Vincent')!

    expect(pierre.attributes.degre).toStrictEqual(0)
    expect(fred.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(bernard.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(claude.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(cody.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(vincent.attributes.degre).toStrictEqual(Degree.Degree5)

})