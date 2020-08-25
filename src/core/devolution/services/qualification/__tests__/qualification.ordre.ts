import { assignOrdre } from '../Ordre'
import { Ordre } from '../../../entities'
import { MemberConstructor, Family } from '../../../entities'

it('should test ordre 1', () => {
    const data: MemberConstructor[] =  [
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":0, "ordre": 0, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Pierre","childs":["Claude"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Claude","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        ]

    const solution = assignOrdre(Family.create(data, "Bernard", "Bernard"))

    const bernard = solution.findMember('Bernard')!
    const fred = solution.findMember('Fred')!
    const pierre = solution.findMember('Pierre')!
    const claude = solution.findMember('Claude')!
    const alphonse = solution.findMember('Alphonse')!
    const leo = solution.findMember('Leo')!
    const romeo = solution.findMember('Romeo')!

    expect(bernard.attributes.ordre).toStrictEqual(0)
    expect(fred.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(pierre.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(claude.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(alphonse.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(leo.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(romeo.attributes.ordre).toStrictEqual(Ordre.Ordre1)
})

it('should test ordre 2', () => {
    const data: MemberConstructor[] = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":0, "ordre": 0, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Marie","childs":["Gerard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Gerard","childs":["Romeo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romeo","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Guillaume"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Guillaume","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}}
        ]

    const solution = assignOrdre(Family.create(data, "Pierre", "Fred"))

    const pierre = solution.findMember('Pierre')!
    const fred = solution.findMember('Fred')!
    const marie = solution.findMember('Marie')!
    const gerard = solution.findMember('Gerard')!
    const romeo = solution.findMember('Romeo')!
    const leo = solution.findMember('Leo')!
    const guillaume = solution.findMember('Guillaume')!

    expect(pierre.attributes.ordre).toStrictEqual(0)
    expect(fred.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(marie.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(gerard.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(romeo.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(leo.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(guillaume.attributes.ordre).toStrictEqual(Ordre.Ordre2)
})

it('should test ordre 3', () => {
    const data: MemberConstructor[] = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":0, "ordre": 0, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Leo","childs":["Bernard"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Alphonse","childs":["Leo"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Cody","childs":["Alphonse"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Etienne","childs":["Cody"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        ]

    const solution = assignOrdre(Family.create(data, "Pierre", "Etienne"))

    const pierre = solution.findMember('Pierre')!
    const fred = solution.findMember('Fred')!
    const bernard = solution.findMember('Bernard')!
    const leo = solution.findMember('Leo')!
    const alphonse = solution.findMember('Alphonse')!
    const cody = solution.findMember('Cody')!
    const etienne = solution.findMember('Etienne')!

    expect(pierre.attributes.ordre).toStrictEqual(0)
    expect(fred.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(bernard.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(leo.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(alphonse.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(cody.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(etienne.attributes.ordre).toStrictEqual(Ordre.Ordre3)
})

it('should test ordre 4', () => {
    const data: MemberConstructor[] = [
        {"member_id":"Pierre","childs":[],"attributes":{"status": 'valid', "degre":0, "ordre": 0, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bernard","childs":["Fred"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Claude", "childs":["Bernard", "Cody"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Cody", "childs":["Vincent"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "Vincent", "childs":[], "attributes": {"status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        ]

    const solution = assignOrdre(Family.create(data, "Pierre", "Claude"))

    const pierre = solution.findMember('Pierre')!
    const fred = solution.findMember('Fred')!
    const bernard = solution.findMember('Bernard')!
    const claude = solution.findMember('Claude')!
    const cody = solution.findMember('Cody')!
    const vincent = solution.findMember('Vincent')!

    expect(pierre.attributes.ordre).toStrictEqual(0)
    expect(fred.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(bernard.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(claude.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(cody.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(vincent.attributes.ordre).toStrictEqual(Ordre.Ordre4)
})