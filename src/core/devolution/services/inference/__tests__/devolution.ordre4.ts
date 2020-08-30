import { Status, Family, MemberConstructor } from '../../../entities'
import { getDevolution } from '../main'

//TODO : qualification fente
//TODO : legalRights fente
describe('Degree wise', () => {
    
    it('should favor degre 5 over degre 6', () => {
        const simpleOrdre4: MemberConstructor[] = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "deCujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "father"
            },
            {
                "childs": [
                    "de_cujus"
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father",
                    "uncle",
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "cousin"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 4,
                    "status": Status.Deceased,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "uncle"
            },
            {
                "childs": [
                    "little_cousin"
                ],
                "attributes": {
                    "degre": 4,
                    "ordre": 4,
                    "status": Status.Deceased,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "cousin"
            },
            {
                "childs": [
                    "son_of_little_cousin"
                ],
                "attributes": {
                    "degre": 5,
                    "ordre": 4,
                    "status": Status.Valid,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "little_cousin"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 6,
                    "ordre": 4,
                    "status": Status.Valid,
                    "spouse": [''],
                    "legalRights": "unassigned",
                    "branch": "unassigned",
                    "isReprésentant": "unassigned",
                    "isReprésenté": "unassigned",
                },
                "member_id": "son_of_little_cousin"
            },
        ]
        const family = Family.create(simpleOrdre4, 'deCujus')
        const solution = getDevolution(family)

        const deCujus = solution.findMember('deCujus')!
        const mother = solution.findMember('mother')!
        const father = solution.findMember('father')!
        const paternal_grand_father = solution.findMember('paternal_grand_father')!
        const uncle = solution.findMember('uncle')!
        const cousin = solution.findMember('cousin')!
        const little_cousin = solution.findMember('little_cousin')!
        const son_of_little_cousin = solution.findMember('son_of_little_cousin')!

        expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
        expect(mother.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(0)
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(uncle.legalRights.valueOf()).toStrictEqual(0)
        expect(cousin.legalRights.valueOf()).toStrictEqual(0)
        expect(little_cousin.legalRights.valueOf()).toStrictEqual(1)
        expect(son_of_little_cousin?.legalRights.valueOf()).toStrictEqual(0)
    })
})