import { representationOfADescendant } from '../représentation'
import { Status } from '../../../entities'
import * as R from 'ramda'
it('should not be appliable when heirs doesnt belong do Ordre 1', () => {
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

    expect(representationOfADescendant(secondOrdreHeirs)
        .filter(heir => heir.isReprésenté))
        .toHaveLength(0)
})

it('should not be appliable when heirs are not parent with the représenté', () => {
    const unrelatedHeirs = [
        {
            "childs": [
                "homer",
                "maggie",
                "alphonse"
            ],
            "data": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "abe"
        },
        {
            "childs": [
                "gerard",
                "mathieu"
            ],
            "data": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "data": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "alphonse"
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
    expect(representationOfADescendant(unrelatedHeirs)
        .filter(heir => heir.isReprésenté))
        .toHaveLength(1)

    expect(representationOfADescendant(unrelatedHeirs)
        .filter(heir => heir.isReprésentant))
        .toHaveLength(0)
})

it('should be appliable when heirs belong to Ordre 1', () => {
    const firstOrderHeirs = [
        {
            "childs": [
                "homer"
            ],
            "data": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "abe"
        },
        {
            "childs": [
                "alphonse",
                "maggie"
            ],
            "data": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "data": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "alphonse"
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

    expect(representationOfADescendant(firstOrderHeirs)
        .filter(heir => heir.isReprésentant)
        .find(heir => heir.member_id === "maggie"))
        .toBeTruthy()
    
    expect(representationOfADescendant(firstOrderHeirs)
        .filter(heir => heir.isReprésentant))
        .toHaveLength(2)

    expect(representationOfADescendant(firstOrderHeirs)
        .filter(heir => heir.isReprésenté)
        .find(heir => heir.member_id === "homer"))
        .toBeTruthy()

    expect(representationOfADescendant(firstOrderHeirs)
        .filter(heir => heir.isReprésenté))
        .toHaveLength(1)
})

it('should not work when a potential représentant is not eligible for inheritance', () => {
    const deadAlphonse = [
        {
            "childs": [
                "homer"
            ],
            "data": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "abe"
        },
        {
            "childs": [
                "alphonse",
                "maggie"
            ],
            "data": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "homer"
        },
        {
            "childs": ["theo"],
            "data": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "alphonse"
        },
        {
            "childs": [],
            "data": {
                "degre": 3,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "theo"
        },
    ]

    expect(representationOfADescendant(deadAlphonse)
        .filter(heir => heir.isReprésentant)
        .find(heir => heir.member_id === "alphonse"))
        .toBeFalsy()

})