import { Status, Family, Qualification, Devolution } from '..'

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
    const solution = devolution.computeRepresentation(family)

    const alphonse = solution.findMember('alphonse')
    const validDescendant = solution.findParentsOf('validDescendant')
        
    expect(alphonse.legalRights).toStrictEqual(1/2)
    expect(validDescendant.length).toStrictEqual(1/2)
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

    const solution = devolution.computeRepresentation(family)

    const alphonse = solution.findMember('alphonse')
    const validDescendant = solution.findMember('validDescendant')

    expect(alphonse.legalRights).toStrictEqual(0)
    expect(validDescendant.legalRights).toStrictEqual(1)
})