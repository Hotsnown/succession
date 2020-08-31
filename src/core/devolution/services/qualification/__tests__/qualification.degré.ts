import { assignDegrés } from '../Degré'
import { Family, Degree, MemberConstructor } from '../../../entities'

it('should test degrés in ordre 1', () => {
    const data: MemberConstructor[] =  [
        {"member_id":"deCujus","childs":["son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"son","childs":["grand_son", "grand_son2"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_son","childs":["grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_son2","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_son","childs":["grand_grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_son","childs":["grand_grand_grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_son","childs":["grand_grand_grand_grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_son","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        ]

    const solution = assignDegrés(Family.create(data, "deCujus", "deCujus"))

    const deCujus = solution.findMember('deCujus')
    const son = solution.findMember('son')
    const grand_son = solution.findMember('grand_son')
    const grand_son2 = solution.findMember('grand_son2')
    const grand_grand_son = solution.findMember('grand_grand_son')
    const grand_grand_grand_son = solution.findMember('grand_grand_grand_son')
    const grand_grand_grand_grand_son = solution.findMember('grand_grand_grand_grand_son')
    const grand_grand_grand_grand_grand_son = solution.findMember('grand_grand_grand_grand_grand_son')

    expect(deCujus.attributes.degre).toStrictEqual(0)
    expect(son.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(grand_son.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(grand_son2.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(grand_grand_son.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(grand_grand_grand_son.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(grand_grand_grand_grand_son.attributes.degre).toStrictEqual(Degree.Degree5)
    expect(grand_grand_grand_grand_grand_son.attributes.degre).toStrictEqual(Degree.Degree6)
})

it('should test degrés in ordre 2', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus","sibling"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"mother","childs":["deCujus","sibling"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"sibling","childs":["nephew"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"nephew","childs":["grand_nephew"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_nephew","childs":["grand_grand_nephew"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_nephew","childs":["grand_grand_grand_nephew"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_nephew","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }}
        ]

    const solution = assignDegrés(Family.create(data, "deCujus", "father"))

    const deCujus = solution.findMember('deCujus')
    const father = solution.findMember('father')
    const mother = solution.findMember('mother')
    const sibling = solution.findMember('sibling')
    const nephew = solution.findMember('nephew')
    const grand_nephew = solution.findMember('grand_nephew')
    const grand_grand_nephew = solution.findMember('grand_grand_nephew')
    const grand_grand_grand_nephew = solution.findMember('grand_grand_grand_nephew')

    expect(deCujus.attributes.degre).toStrictEqual(0)
    expect(father.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(mother.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(sibling.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(nephew.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(grand_nephew.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(grand_grand_nephew.attributes.degre).toStrictEqual(Degree.Degree5)
    expect(grand_grand_grand_nephew.attributes.degre).toStrictEqual(Degree.Degree6)
})

it('should test degrés in ordre 3', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_father","childs":["father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_father","childs":["grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_father","childs":["grand_grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_father","childs":["grand_grand_grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_father","childs":["grand_grand_grand_grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        ]

    const solution = assignDegrés(Family.create(data, "deCujus", "grand_grand_grand_grand_grand_father"))

    const deCujus = solution.findMember('deCujus')!
    const father = solution.findMember('father')!
    const grand_father = solution.findMember('grand_father')!
    const grand_grand_father = solution.findMember('grand_grand_father')!
    const grand_grand_grand_father = solution.findMember('grand_grand_grand_father')!
    const grand_grand_grand_grand_father = solution.findMember('grand_grand_grand_grand_father')!
    const grand_grand_grand_grand_grand_father = solution.findMember('grand_grand_grand_grand_grand_father')!

    expect(deCujus.attributes.degre).toStrictEqual(0)
    expect(father.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(grand_father.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(grand_grand_father.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(grand_grand_grand_father.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(grand_grand_grand_grand_father.attributes.degre).toStrictEqual(Degree.Degree5)
    expect(grand_grand_grand_grand_grand_father.attributes.degre).toStrictEqual(Degree.Degree6)
})

it('should test degrés in ordre 4', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_father","childs":["father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "grand_grand_father", "childs":["grand_father", "grand_uncle"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "grand_uncle", "childs":["grand_cousin"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "grand_cousin", "childs":[], "attributes": {"status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        ]

    const solution = assignDegrés(Family.create(data, "deCujus", "grand_grand_father"))

    const deCujus = solution.findMember('deCujus')!
    const father = solution.findMember('father')!
    const grand_father = solution.findMember('grand_father')!
    const grand_grand_father = solution.findMember('grand_grand_father')!
    const grand_uncle = solution.findMember('grand_uncle')!
    const grand_cousin = solution.findMember('grand_cousin')!

    expect(deCujus.attributes.degre).toStrictEqual(0)
    expect(father.attributes.degre).toStrictEqual(Degree.Degree1)
    expect(grand_father.attributes.degre).toStrictEqual(Degree.Degree2)
    expect(grand_grand_father.attributes.degre).toStrictEqual(Degree.Degree3)
    expect(grand_uncle.attributes.degre).toStrictEqual(Degree.Degree4)
    expect(grand_cousin.attributes.degre).toStrictEqual(Degree.Degree5)

})