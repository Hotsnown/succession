import { Status, Family, Qualification, Devolution } from '../../../entities'

it('should give to the représentant the same right as the other members', () => {
    const oneRepresentantOneValid = [
        {
            "childs": [
                "homer",
                "validDescendant"
            ],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "abe"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "validDescendant"
        },
        {
            "childs": [
                "alphonse",
            ],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "alphonse"
        },
    ]

    const family = new Qualification(Family.create(oneRepresentantOneValid)).assignRepresentation()
    const devolution = new Devolution(family)
        
    expect(
        devolution.computeRepresentation(family)
        .findMember('alphonse')
        .legalRights).toStrictEqual(1/2)

    expect(
        devolution.computeRepresentation(family)
        .findMember('validDescendant')
        .legalRights).toStrictEqual(1/2)
})

it('should not give to the représentant the same right as the other members when representant is dead', () => {
    const oneRepresentantOneValid = [
        {
            "childs": [
                "homer",
                "validDescendant"
            ],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "abe"
        },
        {
        "childs": [],
        "attributes": {
            "degre": 1,
            "ordre": 1,
            "status": Status.Valid
        },
        "member_id": "validDescendant"
        },
        {
            "childs": [
                "alphonse",
            ],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "alphonse"
        },
    ]

    const family = new Qualification(Family.create(oneRepresentantOneValid)).assignRepresentation()
    const devolution = new Devolution(family)
    
    expect(
        devolution.computeRepresentation(family)
        .findMember('alphonse')
        .legalRights).toStrictEqual(0)

    expect(
        devolution.computeRepresentation(family)
        .findMember('validDescendant')
        .legalRights).toStrictEqual(1)
})