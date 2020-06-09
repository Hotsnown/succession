import { Status, Family, Member } from '../../entities'
import { repartitionParTête } from '..'

it('should not return members when there is no members', () => {
    const noMember = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Valid
            },
            "member_id": "homer"
        }
    ]

    const family = Family.create(noMember)
    const devolution = repartitionParTête(family)
    const deCujus = family.props.value.deCujus

    expect(deCujus.legalRights).toBe(0)
    expect(devolution.members).toHaveLength(1)
})

describe('should give equal rights to everyone who belongs to the same order', () => {

    it('should give full right to an unique member', () => {
        const firstOrderMembers = [
            {
                "childs": [],
                "attributes": {
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
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "homer"
            }
        ]

        const family = Family.create(firstOrderMembers)
        const devolution = repartitionParTête(family)
        const maggie = family.findMember('maggie')

        expect(maggie.legalRights).toBe(1)
    })

    it('should give equal rights to all second degree members when there is no first degree member', () => {
        const secondDegreesMembers = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "abe"
            },
            {
                "childs": [],
                "attributes": {
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
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "lisa"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "millhouse_jr"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "maggie"
            },
        ]

        const family = Family.create(secondDegreesMembers)
        const devolution = repartitionParTête(family)
        const lisa = family.findMember('lisa')
        const maggie = family.findMember('maggie')
        const bart = family.findMember('bart')
        const millhouse_jr = family.findMember('millhouse_jr')

        expect(lisa.legalRights).toBe(1/3)
        expect(maggie.legalRights).toBe(1/3)
        expect(bart.legalRights).toBe(1/3)
        expect(millhouse_jr.legalRights).toBe(0)

    })
})

describe('test ordre', () => {
    it('should pass to ordre 2 when there is no ordre 1', () => {
        const secondOrdreMembers = [
            {
                "childs": [],
                "attributes": {
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
                "attributes": {
                    "degre": 1,
                    "ordre": 2,
                    "status": Status.Valid
                },
                "member_id": "homer"
            }
        ]

        const family = Family.create(secondOrdreMembers)    
        const devolution = repartitionParTête(family)
        const homer = devolution.findMember('homer')
    
        expect(homer.legalRights).toBe(1)
    })
})