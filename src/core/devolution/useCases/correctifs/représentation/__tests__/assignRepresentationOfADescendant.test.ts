import { assignRepresentation } from '../extractReprésentationAttribute'
import { Status, Family, Member } from '../../../../entities'
it('should not be appliable when members doesnt belong do Ordre 1', () => {
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

    const {members} = assignRepresentation(
        Family.create(secondOrdreMembers))

    expect(members
        .filter(member => member.isReprésenté))
        .toHaveLength(0)
})

it('should not be appliable when members are not parent with the représenté', () => {
    const unrelatedMembers = [
        {
            "childs": [
                "homer",
                "maggie",
                "alphonse"
            ],
            "attributes": {
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

    const {members} = assignRepresentation(Family.create(unrelatedMembers))

    expect(members
        .filter(member => member.isReprésenté))
        .toHaveLength(0)

    expect(members
        .filter(member => member.isReprésentant))
        .toHaveLength(0)
})

it('should be appliable when members belong to Ordre 1', () => {
    const firstOrderMembers = [
        {
            "childs": [
                "homer"
            ],
            "attributes": {
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

    const {members} = assignRepresentation(
        Family.create(firstOrderMembers))

    expect(members
        .filter(member => member.isReprésentant)
        .find(member => member.props.value.member_id === "maggie"))
        .toBeTruthy()
    
    expect(members
        .filter(member => member.isReprésentant))
        .toHaveLength(2)

    expect(members
        .filter(member => member.isReprésenté)
        .find(member => member.member_id === "homer"))
        .toBeTruthy()

    expect(members
        .filter(member => member.isReprésenté))
        .toHaveLength(1)
})

it('should not work when a potential représentant' +
    'is not eligible for inheritance', () => {
    const deadAlphonse = [
        {
            "childs": [
                "homer"
            ],
            "attributes": {
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
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased,
            },
            "member_id": "homer"
        },
        {
            "childs": ["theo"],
            "attributes": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "alphonse"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 3,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "theo"
        },
    ]

    const {members} = assignRepresentation(
        Family.create(deadAlphonse))

    expect(members
        .filter(member => member.isReprésentant)
        .find(member => member.member_id === "alphonse"))
        .toBeFalsy()

})