import { assignFenteCollaterale } from '../Fente'
import { MemberConstructor, Family, Degree, Ordre } from '../../../entities'

it('complete data', () => {
    const data: MemberConstructor[] = [
        {"member_id":"deCujus","childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"father","childs":["deCujus"], "attributes": { "spouse": ["mother"], "status": 'valid', "degre":Degree.Degree1, "ordre": Ordre.Ordre3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"mother","childs":["deCujus"], "attributes": { "spouse": ["father"], "status": 'valid', "degre":Degree.Degree1, "ordre": Ordre.Ordre3, "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"maternal_grand_father","childs":["mother", "maternal_uncle"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "maternal_uncle", "childs":[], "attributes": { "spouse": ["maternal_uncle_spouse"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "maternal_uncle_spouse", "childs":[], "attributes": { "spouse": ["maternal_uncle"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"paternal_grand_father","childs":["father", "uncle", "paternal_aunt", "paternal_uncle"], "attributes": { "spouse": ["paternal_grand_mother"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id":"paternal_grand_mother","childs":["father", "uncle", "paternal_aunt", "paternal_uncle"], "attributes": { "spouse": ["paternal_grand_father"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "paternal_aunt", "childs":[], "attributes": { "spouse": ["paternal_aunt_spouse"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "paternal_aunt_spouse", "childs":[], "attributes": { "spouse": ["paternal_aunt"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "paternal_uncle", "childs":["paternal_cousin"], "attributes": { "spouse": ["paternal_uncle_spouse"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "paternal_uncle_spouse", "childs":["paternal_cousin"], "attributes": { "spouse": ["paternal_uncle"], "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "paternal_cousin", "childs":["son_of_cousin"], "attributes": { "spouse": ["cousin_spouse"], "status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "cousin_spouse", "childs":["son_of_cousin"], "attributes": { "spouse": ["paternal_cousin"], "status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "son_of_cousin", "childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', 'degre': 'unassigned', 'ordre': 'unassigned', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "paternal_grand_grand_father", "childs":["paternal_grand_father", "grand_uncle"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_uncle", "childs":["grand_cousin"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_cousin", "childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "paternal_grand_grand_grand_father", "childs":["paternal_grand_grand_father", "grand_grand_uncle"], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
        {"member_id": "grand_grand_uncle", "childs":[], "attributes": { "spouse": "without spouse", "status": 'valid', "degre":"unassigned", "ordre": "unassigned", "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "index": "unassigned", }},
    ]

    const solution = assignFenteCollaterale(Family.create(data, "deCujus", "paternal_grand_grand_grand_father"))

    const deCujus = solution.findMember('deCujus')!
    const father = solution.findMember('father')!
    const mother = solution.findMember('mother')

    const maternal_grand_father = solution.findMember('maternal_grand_father')!
    const maternal_uncle = solution.findMember('maternal_uncle')
    const maternal_uncle_spouse = solution.findMember('maternal_uncle_spouse')
    
    const paternal_grand_father = solution.findMember('paternal_grand_father')!
    const paternal_grand_mother = solution.findMember('paternal_grand_mother')
    const paternal_aunt = solution.findMember('paternal_aunt')
    const paternal_aunt_spouse = solution.findMember('paternal_aunt_spouse')
    const paternal_uncle = solution.findMember('paternal_uncle')!
    const paternal_uncle_spouse = solution.findMember('paternal_uncle_spouse')
    const paternal_cousin = solution.findMember('paternal_cousin')!
    const cousin_spouse = solution.findMember('cousin_spouse')
    const son_of_cousin = solution.findMember('son_of_cousin')
    
    const paternal_grand_grand_father = solution.findMember('paternal_grand_grand_father')!
    const grand_uncle = solution.findMember('grand_uncle')
    const grand_cousin = solution.findMember('grand_cousin')
    
    const paternal_grand_grand_grand_father = solution.findMember('paternal_grand_grand_grand_father')
    const grand_grand_uncle = solution.findMember('grand_grand_uncle')
    
    expect(deCujus.attributes.branch).toStrictEqual('unassigned')
    expect(father.attributes.branch).toStrictEqual('unassigned')
    expect(mother.attributes.branch).toStrictEqual('unassigned')

    expect(maternal_grand_father.attributes.branch).toStrictEqual('unassigned')
    expect(maternal_uncle.attributes.branch).toStrictEqual('maternelle')
    expect(maternal_uncle_spouse.attributes.branch).toStrictEqual('unassigned')

    expect(paternal_grand_father.attributes.branch).toStrictEqual('unassigned')
    expect(paternal_grand_mother.attributes.branch).toStrictEqual('unassigned')
    expect(paternal_aunt.attributes.branch).toStrictEqual('paternelle')
    expect(paternal_aunt_spouse.attributes.branch).toStrictEqual('unassigned')
    expect(paternal_uncle.attributes.branch).toStrictEqual('paternelle')
    expect(paternal_uncle_spouse.attributes.branch).toStrictEqual('unassigned')
    expect(paternal_cousin.attributes.branch).toStrictEqual('paternelle')
    expect(cousin_spouse.attributes.branch).toStrictEqual('unassigned')
    expect(son_of_cousin.attributes.branch).toStrictEqual('paternelle')
    
    expect(paternal_grand_grand_father.attributes.branch).toStrictEqual('unassigned')
    expect(grand_uncle.attributes.branch).toStrictEqual('paternelle')
    expect(grand_cousin.attributes.branch).toStrictEqual('paternelle')
    
    expect(paternal_grand_grand_grand_father.attributes.branch).toStrictEqual('unassigned')
    expect(grand_grand_uncle.attributes.branch).toStrictEqual('paternelle')
})