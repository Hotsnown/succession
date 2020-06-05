import { Status, Family, Heir } from '../../entities'
import { repartitionParTête } from '..'

it('should not return heirs when there is no heirs', () => {
    const noHeir = [
        {
            "childs": [],
            "data": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Valid
            },
            "member_id": "homer",
            "isReprésenté": false,
            "isReprésentant": false,
            "legalRights": 0
        }
    ]

    const family = Family.create({value: noHeir.map(heir => Heir.create({value: heir}))})
    const devolution = repartitionParTête(family)
    const deCujus = family.findHeir('homer')

    expect(deCujus.legalRights).toBe(0)
    expect(devolution.value).toHaveLength(1)
})

describe('should give equal rights to everyone who belongs to the same order', () => {

    it('should give full right to an unique heir', () => {
        const firstOrderHeirs = [
            {
                "childs": [],
                "data": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "maggie",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            },
            {
                "childs": [
                    "bart",
                    "lisa",
                    "maggie"
                ],
                "data": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "homer",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            }
        ]

        const family = Family.create({value: firstOrderHeirs.map(heir => Heir.create({value: heir}))})
        const devolution = repartitionParTête(family)
        const maggie = family.findHeir('maggie')

        expect(maggie.legalRights).toBe(1)
    })

    it('should give equal rights to all second degree heirs when there is no first degree heir', () => {
        const secondDegreesHeirs = [
            {
                "childs": [],
                "data": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "abe",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            },
            {
                "childs": [],
                "data": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "bart",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            },
            {
                "childs": [
                    "millhouse_jr"
                ],
                "data": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "lisa",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            },
            {
                "childs": [],
                "data": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "millhouse_jr",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            },
            {
                "childs": [],
                "data": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "maggie",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            },
        ]

        const family = Family.create({value: secondDegreesHeirs.map(heir => Heir.create({value: heir}))})
        const devolution = repartitionParTête(family)
        devolution.value.map(c => console.log(c))
        const lisa = family.findHeir('lisa')
        const maggie = family.findHeir('maggie')
        const bart = family.findHeir('bart')
        const millhouse_jr = family.findHeir('millhouse_jr')

        expect(lisa.legalRights).toBe(1/3)
        expect(maggie.legalRights).toBe(1/3)
        expect(bart.legalRights).toBe(1/3)
        expect(millhouse_jr.legalRights).toBe(0)

    })
})

describe('test ordre', () => {
    it('should pass to ordre 2 when there is no ordre 1', () => {
        const secondOrdreHeirs = [
            {
                "childs": [],
                "data": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "maggie",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            },
            {
                "childs": [
                    "bart",
                    "lisa",
                    "maggie"
                ],
                "data": {
                    "degre": 1,
                    "ordre": 2,
                    "status": Status.Valid
                },
                "member_id": "homer",
                "isReprésenté": false,
                "isReprésentant": false,
                "legalRights": 0
            }
        ]

        const family = Family.create({value: secondOrdreHeirs.map(heir => Heir.create({value: heir}))})    
        const devolution = repartitionParTête(family)
        const homer = devolution.findHeir('homer')
    
        expect(homer.legalRights).toBe(1)
    })
})