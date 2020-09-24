import { assignOrdres } from '../Ordre'
import { Ordre } from '../../../entities'
import { MemberConstructor, Family } from '../../../entities'

it('should assign ordre 1', () => {
    const data: MemberConstructor[] =  [
        {"member_id":"deCujus","childs":["son"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"son","childs":["grand_son"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_son","childs":["grand_grand_son"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_son","childs":["grand_grand_grand_son"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_grand_son","childs":["grand_grand_grand_grand_son"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_son","childs":["grand_grand_grand_grand_grand_son"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_son","childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
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
 
it('should assign ordre 2', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus","sibling"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"mother","childs":["deCujus","sibling"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"sibling","childs":["nephew"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"nephew","childs":["grand_nephew"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_nephew","childs":["grand_grand_nephew"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_nephew","childs":["grand_grand_grand_nephew"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_grand_nephew","childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }}
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

it('should assign ordre 3', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_father","childs":["father"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_father","childs":["grand_father"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_father","childs":["grand_grand_father"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_father","childs":["grand_grand_grand_grand_father"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"grand_grand_grand_grand_grand_grand_father","childs":["grand_grand_grand_grand_grand_father"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
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

it('should assign ordre 4', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus"], "attributes": { "spouse": ["mother"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"mother","childs":["deCujus"], "attributes": { "spouse": ["father"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"maternal_grand_father","childs":["mother", "maternal_uncle"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "maternal_uncle", "childs":[], "attributes": { "spouse": ["maternal_uncle_spouse"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "maternal_uncle_spouse", "childs":[], "attributes": { "spouse": ["maternal_uncle"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"paternal_grand_father","childs":["father", "uncle", "aunt"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "aunt", "childs":["cousin"], "attributes": { "spouse": ["aunt_spouse"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "aunt_spouse", "childs":["cousin"], "attributes": { "spouse": ["aunt"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "uncle", "childs":["cousin"], "attributes": { "spouse": ["uncle_spouse"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "uncle_spouse", "childs":["cousin"], "attributes": { "spouse": ["uncle"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "cousin", "childs":["son_of_cousin"], "attributes": { "spouse": ["cousin_spouse"], "status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "cousin_spouse", "childs":["son_of_cousin"], "attributes": { "spouse": ["cousin"], "status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "son_of_cousin", "childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_grand_father", "childs":["paternal_grand_father", "grand_uncle"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_uncle", "childs":["grand_cousin"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_cousin", "childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_grand_grand_father", "childs":["grand_grand_father", "grand_grand_uncle"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_grand_uncle", "childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
    ]

    const solution = assignOrdres(Family.create(data, "deCujus", "grand_grand_father"))

    const deCujus = solution.findMember('deCujus')!
    const father = solution.findMember('father')!
    const mother = solution.findMember('mother')

    const maternal_grand_father = solution.findMember('maternal_grand_father')!
    const maternal_uncle = solution.findMember('maternal_uncle')
    const maternal_uncle_spouse = solution.findMember('maternal_uncle_spouse')
    
    const paternal_grand_father = solution.findMember('paternal_grand_father')!
    const aunt = solution.findMember('aunt')
    const aunt_spouse = solution.findMember('aunt_spouse')
    const uncle = solution.findMember('uncle')!
    const uncle_spouse = solution.findMember('uncle_spouse')
    const cousin = solution.findMember('cousin')!
    const cousin_spouse = solution.findMember('cousin_spouse')
    const son_of_cousin = solution.findMember('son_of_cousin')
    
    const grand_grand_father = solution.findMember('grand_grand_father')!
    const grand_uncle = solution.findMember('grand_uncle')
    const grand_cousin = solution.findMember('grand_cousin')
    
    const grand_grand_grand_father = solution.findMember('grand_grand_grand_father')
    const grand_grand_uncle = solution.findMember('grand_grand_uncle')
    
    expect(deCujus.attributes.ordre).toStrictEqual(0)
    expect(father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(mother.attributes.ordre).toStrictEqual(Ordre.Ordre3)

    expect(maternal_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(maternal_uncle.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(maternal_uncle_spouse.attributes.ordre).toStrictEqual('outsider')

    expect(paternal_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(aunt.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(aunt_spouse.attributes.ordre).toStrictEqual('outsider')
    expect(uncle.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(uncle_spouse.attributes.ordre).toStrictEqual('outsider')
    expect(cousin.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(cousin_spouse.attributes.ordre).toStrictEqual('outsider')
    expect(son_of_cousin.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    
    expect(grand_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_uncle.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    expect(grand_cousin.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    
    expect(grand_grand_grand_father.attributes.ordre).toStrictEqual(Ordre.Ordre3)
    expect(grand_grand_uncle.attributes.ordre).toStrictEqual(Ordre.Ordre4)
    
})
