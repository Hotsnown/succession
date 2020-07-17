import { Status, Family } from '../../../entities'
import { main } from '../main'
import { getFirstAppliableOrdreNumber } from '../Ordres'

describe('calcul : si un parent survivant : 50% + 50% / nombre de collatéraux (ne pas oublier la représentation)', () =>  {
    it('should give 50% to the remaining parent', () => {
            const onlyOneParent = [
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
                    "member_id": "deCujus"
                },
                {
                    "childs": [
                        "deCujus",
                        "sibling1",
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
                        "deCujus",
                        "sibling1",
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
                    "childs": [],
                    "attributes": {
                        "degre": 2,
                        "ordre": 2,
                        "status": Status.Valid,
                        "spouse": "",
                        "legalRights": "unassigned" as 'unassigned',
                        "branch": "unassigned" as 'unassigned',
                        "isReprésentant": "unassigned" as 'unassigned',
                        "isReprésenté": "unassigned" as 'unassigned',
                    },
                    "member_id": "sibling1"
                }
            ]
    
            const family = main(Family.create(onlyOneParent), 'deCujus')

            expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(2)
            
            const deCujus = family.findMember('deCujus')!
            const father = family.findMember('father')!
            const mother = family.findMember('mother')!
            const sibling1 = family.findMember('sibling1')!
        
            expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
            expect(father.legalRights.valueOf()).toStrictEqual(0)
            expect(mother.legalRights.valueOf()).toStrictEqual(1/2)
            expect(sibling1.legalRights.valueOf()).toStrictEqual(1/2)
        })
})

describe('calcul : si deux parents survivants : 25% + 25% + 50% / nombre de collatéraux (ne pas oublier la représentation)', () => {
    it('should give 25% to the two remaining parents (no representation)', () => {
        const secondOrdreMembers = [
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
                "member_id": "deCujus"
            },
            {
                "childs": [
                    "deCujus",
                    "sibling1",
                    "sibling2"
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
                    "deCujus",
                    "sibling1",
                    "sibling2"
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
                    "nephew"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "sibling1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "nephew"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "sibling2"
            }
        ]

        const family = main(Family.create(secondOrdreMembers), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(2)
        
        const deCujus = family.findMember('deCujus')!
        const father = family.findMember('father')!
        const mother = family.findMember('mother')!
        const sibling1 = family.findMember('sibling1')!
        const sibling2 = family.findMember('sibling2')!
        const nephew = family.findMember('nephew')!
    
        expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(1/4)
        expect(mother.legalRights.valueOf()).toStrictEqual(1/4)
        expect(sibling1.legalRights.valueOf()).toStrictEqual(1/2)
        expect(sibling2.legalRights.valueOf()).toStrictEqual(0)
        expect(nephew.legalRights.valueOf()).toStrictEqual(0)
    })

    it('should give 25% to the two remaining parents (with representation)', () => {
        const secondOrdreMembers = [
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
                "member_id": "deCujus"
            },
            {
                "childs": [
                    "deCujus",
                    "normalSibling",
                    "représentéSibling"
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
                    "deCujus",
                    "normalSibling",
                    "représentéSibling"
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
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "normalSibling"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "représentantNephew"
            },
            {
                "childs": [
                    "représentantNephew"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "représentéSibling"
            }
        ]

        const family = main(Family.create(secondOrdreMembers), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(2)
        
        const deCujus = family.findMember('deCujus')!
        const father = family.findMember('father')!
        const mother = family.findMember('mother')!
        const normalSibling = family.findMember('normalSibling')!
        const représentéSibling = family.findMember('représentéSibling')!
        const représentantNephew = family.findMember('représentantNephew')!
    
        expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(1/4)
        expect(mother.legalRights.valueOf()).toStrictEqual(1/4)
        expect(normalSibling.legalRights.valueOf()).toStrictEqual(1/4)
        expect(représentéSibling.legalRights.valueOf()).toStrictEqual(0)
        expect(représentantNephew.legalRights.valueOf()).toStrictEqual(1/4)
    })
})

describe('si parent survivant = 0', () => {
    it('should give 0% to deceased parents (no représentation)', () => {
        const noParents = [
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
                "member_id": "deCujus"
            },
            {
                "childs": [
                    "deCujus",
                    "sibling1",
                    "sibling2"
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
                    "deCujus",
                    "sibling1",
                    "sibling2"
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
                    "nephew"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "sibling1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "nephew"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "sibling2"
            }
        ]

        const family = main(Family.create(noParents), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(2)
        
        const deCujus = family.findMember('deCujus')!
        const father = family.findMember('father')!
        const mother = family.findMember('mother')!
        const sibling1 = family.findMember('sibling1')!
        const sibling2 = family.findMember('sibling2')!
        const nephew = family.findMember('nephew')!
    
        expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(0)
        expect(mother.legalRights.valueOf()).toStrictEqual(0)
        expect(sibling1.legalRights.valueOf()).toStrictEqual(1)
        expect(sibling2.legalRights.valueOf()).toStrictEqual(0)
        expect(nephew.legalRights.valueOf()).toStrictEqual(0)
    })
    it('should give 0% to deceased parents (with représentation)', () => {
        const noParents = [
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
                "member_id": "deCujus"
            },
            {
                "childs": [
                    "deCujus",
                    "sibling1",
                    "sibling2"
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
                    "deCujus",
                    "sibling1",
                    "sibling2"
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
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "sibling1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 2,
                    "status": Status.Valid,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "nephew"
            },
            {
                "childs": [
                    "nephew"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 2,
                    "status": Status.Deceased,
                    "spouse": "",
                    "legalRights": "unassigned" as 'unassigned',
                    "branch": "unassigned" as 'unassigned',
                    "isReprésentant": "unassigned" as 'unassigned',
                    "isReprésenté": "unassigned" as 'unassigned',
                },
                "member_id": "sibling2"
            }
        ]

        const family = main(Family.create(noParents), 'deCujus')

        expect(getFirstAppliableOrdreNumber(family)).toStrictEqual(2)
        
        const deCujus = family.findMember('deCujus')!
        const father = family.findMember('father')!
        const mother = family.findMember('mother')!
        const sibling1 = family.findMember('sibling1')!
        const sibling2 = family.findMember('sibling2')!
        const nephew = family.findMember('nephew')!
    
        expect(deCujus.legalRights.valueOf()).toStrictEqual(0)
        expect(father.legalRights.valueOf()).toStrictEqual(0)
        expect(mother.legalRights.valueOf()).toStrictEqual(0)
        expect(sibling1.legalRights.valueOf()).toStrictEqual(1/2)
        expect(sibling2.legalRights.valueOf()).toStrictEqual(0)
        expect(nephew.legalRights.valueOf()).toStrictEqual(1/2)
    })
})