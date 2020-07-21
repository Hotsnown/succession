import { assignFenteCollaterale } from '../Fente'
import { MemberConstructor, Family } from '../../../entities'

it('', () => {
    const family: MemberConstructor[] =     
    [
        {"member_id":"deCujus","childs":[],"attributes":{"status": 'invalid', "degre":0, "ordre": 0, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"mother","childs":["deCujus"],"attributes":{"status": 'valid', "degre":1, "ordre": 3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        //{"member_id":"father","childs":["deCujus"],"attributes":{"status": 'valid', "degre":1, "ordre": 3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"maternal_grand_mother","childs":["mother", "maternal_cousin"],"attributes":{"status": 'valid', "degre":2, "ordre": 3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "maternal_grand_father", "childs":["mother", "maternal_uncle"], "attributes": {"status": 'valid', "degre":2, "ordre": 3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        //{"member_id": "paternal_grand_father", "childs":["father"], "attributes": {"status": 'valid', "degre":2, "ordre": 3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        //{"member_id": "paternal_grand_mother", "childs":["father"], "attributes": {"status": 'valid', "degre":2, "ordre": 3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "maternal_uncle", "childs":["maternal_cousin"], "attributes": {"status": 'valid', "degre":3, "ordre": 4, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id": "maternal_cousin", "childs":[], "attributes": {"status": 'valid', "degre":4, "ordre": 4, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
    ]

    const solution = assignFenteCollaterale(Family.create(family))
    const deCujus = solution.findMember('deCujus')
    const mother = solution.findMember('mother')
    const maternal_grand_mother = solution.findMember('maternal_grand_mother')
    const maternal_grand_father = solution.findMember('maternal_grand_father')
    const maternal_uncle = solution.findMember('maternal_uncle')
    const maternal_cousin = solution.findMember('maternal_cousin')

    //expect(mother?.attributes.branch).toStrictEqual('maternelle')
    expect(maternal_grand_father?.attributes.branch).toStrictEqual('maternelle')
    expect(maternal_uncle?.attributes.branch).toStrictEqual('maternelle')
    expect(maternal_cousin?.attributes.branch).toStrictEqual('maternelle')
    expect(deCujus?.attributes.branch).toStrictEqual('unassigned')
})