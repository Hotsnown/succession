import { MemberConstructor, Family, Degree } from "../../../entities"
import { getQualification } from "../main"

const data: MemberConstructor[] = 
    [
        {"member_id":"Pierre","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Marie","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"mother","childs":["Pierre","Marie"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ["father"],"index":"unassigned"}},
        {"member_id":"father","childs":["Pierre","Marie"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ["mother"],"index":"unassigned"}},
        {"member_id":"Bea","childs":["Armand","Morgane","Thibault","Romain"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Armand","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Morgane","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Thibault","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Romain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Sylvain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Steph","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Bernard","childs":["father","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}},
        {"member_id":"Claudine","childs":["father","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''],"index":"unassigned"}}
    ]

it.skip('should not return unassigned on any member', () => {
    
    const family = getQualification(Family.create(data, "Pierre", "Bernard"))

    const pierre = family.findMember('Pierre')
    const marie = family.findMember('Marie')
    const mother = family.findMember('mother')
    const father = family.findMember('father')
    const bea = family.findMember('Bea')
    const armand = family.findMember('Armand')
    const morgane = family.findMember('Morgane')
    const thibault = family.findMember('Thibault')
    const romain = family.findMember('Romain')
    const sylvain = family.findMember('Sylvain')
    const steph = family.findMember('Steph')
    const bernard = family.findMember('Bernard')
    const claudine = family.findMember('Claudine')

    expect(pierre.attributes.degre).toStrictEqual(0)
    expect(pierre.attributes.ordre).toStrictEqual(0)
    expect(pierre.attributes.branch).toStrictEqual('unassigned')
    expect(pierre.attributes.isReprésentant).toStrictEqual(false)
    expect(pierre.attributes.isReprésenté).toStrictEqual(false)

    expect(marie.attributes.degre).toStrictEqual(2)
    expect(marie.attributes.ordre).toStrictEqual(2)
    expect(marie.attributes.branch).toStrictEqual('unassigned')
    expect(marie.attributes.isReprésentant).toStrictEqual(false)
    expect(marie.attributes.isReprésenté).toStrictEqual(false)

    expect(mother.attributes.degre).toStrictEqual(1)
    //expect(mother.attributes.ordre).toStrictEqual(3)
    //expect(mother.attributes.branch).toStrictEqual('maternelle')
    //expect(mother.attributes.isReprésenté).toStrictEqual(false)
    //expect(mother.attributes.isReprésentant).toStrictEqual(false)
    
    expect(father.attributes.degre).toStrictEqual(1)
    expect(father.attributes.ordre).toStrictEqual(3)
    expect(father.attributes.branch).toStrictEqual('paternelle')
    expect(father.attributes.isReprésenté).toStrictEqual(false)
    expect(father.attributes.isReprésentant).toStrictEqual(false)

    expect(bea.attributes.degre).toStrictEqual(3)
    expect(bea.attributes.ordre).toStrictEqual(4)
    expect(bea.attributes. branch).toStrictEqual('paternelle')
    expect(bea.attributes.isReprésenté).toStrictEqual(false)
    expect(bea.attributes.isReprésentant).toStrictEqual(false)

    expect(armand.attributes.degre).toStrictEqual(4)
    expect(armand.attributes.ordre).toStrictEqual(4)
    expect(armand.attributes.branch).toStrictEqual('paternelle')
    expect(armand.attributes.isReprésentant).toStrictEqual(false)
    expect(armand.attributes.isReprésenté).toStrictEqual(false)

    expect(morgane.attributes.degre).toStrictEqual(4)
    expect(morgane.attributes.ordre).toStrictEqual(4)
    expect(morgane.attributes.branch).toStrictEqual('paternelle')
    expect(morgane.attributes.isReprésenté).toStrictEqual(false)
    expect(morgane.attributes.isReprésentant).toStrictEqual(false)

    expect(thibault.attributes.degre).toStrictEqual(4)
    expect(thibault.attributes.ordre).toStrictEqual(4)
    expect(thibault.attributes.branch).toStrictEqual('paternelle')
    expect(thibault.attributes.isReprésentant).toStrictEqual(false)
    expect(thibault.attributes.isReprésenté).toStrictEqual(false)

    expect(romain.attributes.degre).toStrictEqual(4)
    expect(romain.attributes.ordre).toStrictEqual(4)
    expect(romain.attributes.branch).toStrictEqual('paternelle')
    expect(romain.attributes.isReprésentant).toStrictEqual(false)
    expect(romain.attributes.isReprésenté).toStrictEqual(false)

    expect(sylvain.attributes.degre).toStrictEqual(3)
    expect(sylvain.attributes.ordre).toStrictEqual(4)
    expect(sylvain.attributes.branch).toStrictEqual('paternelle')
    expect(sylvain.attributes.isReprésenté).toStrictEqual(false)
    expect(sylvain.attributes.isReprésentant).toStrictEqual(false)

    expect(steph.attributes.degre) .toStrictEqual(3)
    expect(steph.attributes.ordre) .toStrictEqual(4)
    expect(steph.attributes.branch) .toStrictEqual('paternelle')
    expect(steph.attributes.isReprésentant) .toStrictEqual(false)
    expect(steph.attributes.isReprésenté) .toStrictEqual(false)

    expect(bernard.attributes.degre).toStrictEqual(2)
    expect(bernard.attributes.ordre).toStrictEqual(3)
    expect(bernard.attributes.branch) .toStrictEqual('paternelle')
    expect(bernard.attributes.isReprésentant).toStrictEqual(false)
    expect(bernard.attributes.isReprésenté).toStrictEqual(false)

    expect(claudine.attributes.degre).toStrictEqual(2)
    expect(claudine.attributes.ordre).toStrictEqual(3)
    expect(claudine.attributes.branch).toStrictEqual('paternelle')
    expect(claudine.attributes.isReprésenté).toStrictEqual(false)
    expect(claudine.attributes.isReprésentant).toStrictEqual(false)
})