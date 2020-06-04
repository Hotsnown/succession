import { findHeir, Status } from '../../entities'
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
            "member_id": "homer"
        }
    ]

    const devolution = repartitionParTête(noHeir)
    const deCujus = findHeir(devolution, 'homer')

    expect(deCujus.legalRights.value).toBe(0)
    expect(devolution).toHaveLength(1)
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
                "member_id": "maggie"
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
                "member_id": "homer"
            }
        ]

        const devolution = repartitionParTête(firstOrderHeirs)
        const maggie = findHeir(devolution, 'maggie')

        expect(maggie.legalRights.value).toBe(1)
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
                "member_id": "abe"
            },
            {
                "childs": [],
                "data": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "bart"
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
                "member_id": "lisa"
            },
            {
                "childs": [],
                "data": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "millhouse_jr"
            },
            {
                "childs": [],
                "data": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "maggie"
            },
        ]

        const devolution = repartitionParTête(secondDegreesHeirs)

        const lisa = findHeir(devolution, 'lisa')
        const maggie = findHeir(devolution, 'maggie')
        const bart = findHeir(devolution, 'bart')
        const millhouse_jr = findHeir(devolution, 'millhouse_jr')

        expect(lisa.legalRights.value).toBe(1/3)
        expect(maggie.legalRights.value).toBe(1/3)
        expect(bart.legalRights.value).toBe(1/3)
        expect(millhouse_jr.legalRights.value).toBe(0)

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
                "member_id": "maggie"
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
                "member_id": "homer"
            }
        ]
    
        const devolution = repartitionParTête(secondOrdreHeirs)
        const homer = findHeir(devolution, 'homer')
    
        expect(homer.legalRights.value).toBe(1)
    })
})