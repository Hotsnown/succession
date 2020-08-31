import { assignOrdres } from '../Ordre'
import { Ordre } from '../../../entities'
import { MemberConstructor, Family } from '../../../entities'

it('should test ordre 1', () => {
    const data: MemberConstructor[] =  [
        {"member_id":"deCujus","childs":["son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"son","childs":["grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_son","childs":["grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_son","childs":["grand_grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_son","childs":["grand_grand_grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_son","childs":["grand_grand_grand_grand_grand_son"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_son","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        ]

    const solution = assignOrdres(Family.create(data, "deCujus", "deCujus"))

    const bernard = solution.findMember('deCujus')!
    const son = solution.findMember('son')!
    const grand_son = solution.findMember('grand_son')!
    const grand_grand_son = solution.findMember('grand_grand_son')!
    const grand_grand_grand_son = solution.findMember('grand_grand_grand_son')!
    const grand_grand_grand_grand_son = solution.findMember('grand_grand_grand_grand_son')!
    const grand_grand_grand_grand_grand_son = solution.findMember('grand_grand_grand_grand_grand_son')!

    expect(bernard.attributes.ordre).toStrictEqual(0)
    expect(son.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(grand_son.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(grand_grand_son.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(grand_grand_grand_son.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(grand_grand_grand_grand_son.attributes.ordre).toStrictEqual(Ordre.Ordre1)
    expect(grand_grand_grand_grand_grand_son.attributes.ordre).toStrictEqual(Ordre.Ordre1)
})
 
it('should test ordre 2', () => {
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

    const solution = assignOrdres(Family.create(data, "deCujus", "father"))

    const deCujus = solution.findMember('deCujus')
    const father = solution.findMember('father')
    const mother = solution.findMember('mother')
    const sibling = solution.findMember('sibling')
    const nephew = solution.findMember('nephew')
    const grand_nephew = solution.findMember('grand_nephew')
    const grand_grand_nephew = solution.findMember('grand_grand_nephew')
    const grand_grand_grand_nephew = solution.findMember('grand_grand_grand_nephew')

    expect(deCujus.attributes.ordre).toStrictEqual(0)
    expect(father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(mother.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(sibling.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(nephew.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(grand_nephew.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(grand_grand_nephew.attributes.ordre).toStrictEqual(Ordre.Ordre2)
    expect(grand_grand_grand_nephew.attributes.ordre).toStrictEqual(Ordre.Ordre2)
})

it('should test ordre 3', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_father","childs":["father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_father","childs":["grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_father","childs":["grand_grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_father","childs":["grand_grand_grand_grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_grand_father","childs":["grand_grand_grand_grand_grand_father"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        ]

    const solution = assignOrdres(Family.create(data, "deCujus", "grand_grand_grand_grand_grand_grand_father"))

    const deCujus = solution.findMember('deCujus')!
    const father = solution.findMember('father')!
    const grand_father = solution.findMember('grand_father')!
    const grand_grand_father = solution.findMember('grand_grand_father')!
    const grand_grand_grand_grand_father = solution.findMember('grand_grand_grand_grand_father')!
    const grand_grand_grand_grand_grand_father = solution.findMember('grand_grand_grand_grand_grand_father')!
    const grand_grand_grand_grand_grand_grand_father = solution.findMember('grand_grand_grand_grand_grand_grand_father')!

    expect(deCujus.attributes.ordre).toStrictEqual(0)
    expect(father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_grand_grand_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_grand_grand_grand_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_grand_grand_grand_grand_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
})

it('should test ordre 4', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id":"grand_father","childs":["father", "uncle"],"attributes":{"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "uncle", "childs":["cousin"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "cousin", "childs":["son_of_cousin"], "attributes": {"status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "son_of_cousin", "childs":[], "attributes": {"status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "grand_grand_father", "childs":["grand_father", "grand_uncle"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "grand_uncle", "childs":["grand_cousin"], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        {"member_id": "grand_cousin", "childs":[], "attributes": {"status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned","spouse": [''], "index": "unassigned", }},
        ]

    const solution = assignOrdres(Family.create(data, "deCujus", "grand_grand_father"))

    const deCujus = solution.findMember('deCujus')!
    const father = solution.findMember('father')!
    const grand_father = solution.findMember('grand_father')!
    const uncle = solution.findMember('uncle')!
    const cousin = solution.findMember('cousin')!
    const son_of_cousin = solution.findMember('son_of_cousin')
    const grand_grand_father = solution.findMember('grand_grand_father')!
    const grand_uncle = solution.findMember('grand_uncle')
    const grand_cousin = solution.findMember('grand_cousin')
    
    expect(deCujus.attributes.ordre).toStrictEqual(0)
    expect(father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(uncle.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(cousin.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(son_of_cousin.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(grand_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_uncle.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(grand_cousin.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    
})
