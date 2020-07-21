import { Status, Family } from '../../../entities'
import { main } from '../main'
import { getFirstAppliableOrdreNumber } from '../utils/Ordres'

describe('test parents', () => {
    it('should give equal shares to two valid parents', () => {
        const existingFente = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_father"
            }
        ]

        const family = main(Family.create(existingFente), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(3)

        const de_cujus = family.findMember('de_cujus')!
        const mother = family.findMember('mother')!
        const father = family.findMember('father')!
        const maternal_grand_father = family.findMember('maternal_grand_father')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!

        expect(de_cujus.legalRights.valueOf()).toStrictEqual(0)
        expect(mother.legalRights.valueOf()).toStrictEqual(1 / 2)
        expect(father.legalRights.valueOf()).toStrictEqual(1 / 2)
        expect(maternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
    })

    it('should give 50% to a valid parent', () => {
        const existingFente = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_mother"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            }
        ]

        const family = main(Family.create(existingFente), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(3)

        const de_cujus = family.findMember('de_cujus')!
        const mother = family.findMember('mother')!
        const father = family.findMember('father')!
        const paternal_grand_mother = family.findMember('paternal_grand_mother')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!

        expect(de_cujus.legalRights.valueOf()).toStrictEqual(0)
        expect(mother.legalRights.valueOf()).toStrictEqual(1 / 2)
        expect(father.legalRights.valueOf()).toStrictEqual(0)
        expect(paternal_grand_mother.legalRights.valueOf()).toStrictEqual(1/4)
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(1/4)
    })
})

describe('In each branch the ascendants of the nearest degree are favored.', () => {
    
    it('should favor degre 2 over degre 3', () => {
        const existingFente = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_father"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_grand_father"
                ],
                "attributes": {
                    "degre": 4,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_grand_father"
            }
        ]

        const family = main(Family.create(existingFente), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(3)

        const maternal_grand_father = family.findMember('maternal_grand_father')!
        const maternal_grand_grand_father = family.findMember('maternal_grand_grand_father')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!
        const maternal_grand_grand_grand_father = family.findMember('maternal_grand_grand_grand_father')!
        
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(1/2)
        expect(maternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_father.legalRights.valueOf()).toStrictEqual(1/2)
        expect(maternal_grand_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
    })

    it('should pass to degre 3 when there is no degre 2', () => {
        const existingFente = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_father"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_grand_father"
                ],
                "attributes": {
                    "degre": 4,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_grand_father"
            }
        ]

        const family = main(Family.create(existingFente), 'deCujus')

        const maternal_grand_father = family.findMember('maternal_grand_father')!
        const maternal_grand_grand_father = family.findMember('maternal_grand_grand_father')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!
        const maternal_grand_grand_grand_father = family.findMember('maternal_grand_grand_grand_father')!
        
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(1/2)
        expect(maternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_grand_father.legalRights.valueOf()).toStrictEqual(1/2)
    })

})

describe('If there is an ascendant in each line (mother, father or other), each line recovers half of the estate.', () => {

})

describe('The ascendants of the same degree divide the succession by head', () => {
    it('should equally share between same degres', () => {
        const existingFente = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_mother"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_father"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_grand_father"
                ],
                "attributes": {
                    "degre": 4,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_grand_father"
            }
        ]

        const family = main(Family.create(existingFente), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(3)

        const maternal_grand_father = family.findMember('maternal_grand_father')!
        const maternal_grand_grand_father = family.findMember('maternal_grand_grand_father')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!
        const paternal_grand_mother = family.findMember('paternal_grand_mother')!
        const maternal_grand_grand_grand_father = family.findMember('maternal_grand_grand_grand_father')!
        
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(1/4)
        expect(paternal_grand_mother.legalRights.valueOf()).toStrictEqual(1/4)
        expect(maternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_grand_father.legalRights.valueOf()).toStrictEqual(1/2)
    })

    it('should not give legal rights to deads members, even if they are in the priviledged degree', () => {
        const existingFente = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_mother"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_father"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_grand_father"
                ],
                "attributes": {
                    "degre": 4,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_grand_father"
            }
        ]
    
        const family = main(Family.create(existingFente), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(3)
    
        const maternal_grand_father = family.findMember('maternal_grand_father')!
        const maternal_grand_grand_father = family.findMember('maternal_grand_grand_father')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!
        const paternal_grand_mother = family.findMember('paternal_grand_mother')!
        const maternal_grand_grand_grand_father = family.findMember('maternal_grand_grand_grand_father')!
        const father = family.findMember('father')!
        const mother = family.findMember('mother')!
        
        expect(mother.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_grand_father.legalRights.valueOf()).toStrictEqual(1/2)
        expect(paternal_grand_mother.legalRights.valueOf()).toStrictEqual(1/2)
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
    })
})

describe('If there is no ascendant in one branch, the ascendants in the other branch collects the entire estate', () => {
    it('should give all estate to the paternal side when all members of the mother side deceased', () => {
        const onlyPaternalBranchRemaining = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_mother"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_father"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_grand_father"
                ],
                "attributes": {
                    "degre": 4,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_grand_father"
            }
        ]
    
        const family = main(Family.create(onlyPaternalBranchRemaining), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(3)
    
        const maternal_grand_father = family.findMember('maternal_grand_father')!
        const maternal_grand_grand_father = family.findMember('maternal_grand_grand_father')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!
        const paternal_grand_mother = family.findMember('paternal_grand_mother')!
        const maternal_grand_grand_grand_father = family.findMember('maternal_grand_grand_grand_father')!
        const father = family.findMember('father')!
        const mother = family.findMember('mother')!

        expect(mother.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(paternal_grand_mother.legalRights.valueOf()).toStrictEqual(1)
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
    })

    it('should give all estate to the maternal side when all members of the father side deceased', () => {
        const onlyPaternalBranchRemaining = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "de_cujus"
            },
            {
                "childs": [
                    "de_cujus",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
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
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "mother"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_father"
            },
            {
                "childs": [
                    "father"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "paternal_grand_mother"
            },
            {
                "childs": [
                    "mother"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_father"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_father"
            },
            {
                "childs": [
                    "maternal_grand_grand_father"
                ],
                "attributes": {
                    "degre": 4,
                    "ordre": 3,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "maternal_grand_grand_grand_father"
            }
        ]
    
        const family = main(Family.create(onlyPaternalBranchRemaining), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(3)
    
        const maternal_grand_father = family.findMember('maternal_grand_father')!
        const maternal_grand_grand_father = family.findMember('maternal_grand_grand_father')!
        const paternal_grand_father = family.findMember('paternal_grand_father')!
        const paternal_grand_mother = family.findMember('paternal_grand_mother')!
        const maternal_grand_grand_grand_father = family.findMember('maternal_grand_grand_grand_father')!
        const father = family.findMember('father')!
        const mother = family.findMember('mother')!

        expect(mother.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(paternal_grand_mother.legalRights.valueOf()).toStrictEqual(0)
        expect(paternal_grand_father.legalRights.valueOf()).toStrictEqual(0)
        expect(maternal_grand_father.legalRights.valueOf()).toStrictEqual(1)
        expect(maternal_grand_grand_father.legalRights.valueOf()).toStrictEqual(0)
    })
})