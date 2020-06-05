import { representation } from '../extractReprésentationAttribute'
import { Status, Family, Heir } from '../../../../entities'
it('should not be appliable when heirs doesnt belong do Ordre 1', () => {
    const secondOrdreHeirs = [
        {
            "childs": [],
            "data": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Valid
            },
            "member_id": "maggie",
            "isReprésentant": false,
            "isReprésenté": false,
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
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
        }
    ]

    const {value} = representation(
        Family.create({value: 
            secondOrdreHeirs.map(heir => Heir.create({value: heir}))}))


    expect(value
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
            "member_id": "abe",
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
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
            "member_id": "homer",
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
        },
        {
            "childs": [],
            "data": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "alphonse",
            "isReprésentant": false,
            "isReprésenté": false,
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
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
        },
    ]

    const {value} = representation(
        Family.create({value: 
            unrelatedHeirs.map(heir => Heir.create({value: heir}))}))

    expect(value
        .filter(heir => heir.isReprésenté))
        .toHaveLength(0)

    expect(value
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
            "member_id": "abe",
            "isReprésentant": false,
            "isReprésenté": false
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
            "member_id": "homer",
            "isReprésentant": false,
            "isReprésenté": false
        },
        {
            "childs": [],
            "data": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "alphonse",
            "isReprésentant": false,
            "isReprésenté": false
        },
        {
            "childs": [],
            "data": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "maggie",
            "isReprésentant": false,
            "isReprésenté": false
        },
    ]

    const {value} = representation(
        Family.create({value: 
            firstOrderHeirs.map(heir => Heir.create({value: heir}))}))

    expect(value
        .filter(heir => heir.isReprésentant)
        .find(heir => heir.props.value.member_id === "maggie"))
        .toBeTruthy()
    
    expect(value
        .filter(heir => heir.isReprésentant))
        .toHaveLength(2)

    expect(value
        .filter(heir => heir.isReprésenté)
        .find(heir => heir.member_id === "homer"))
        .toBeTruthy()

    expect(value
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
            "member_id": "abe",
            "isReprésentant": false,
            "isReprésenté": false
        },
        {
            "childs": [
                "alphonse",
                "maggie"
            ],
            "data": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased,
            },
            "member_id": "homer",
            "isReprésentant": false,
            "isReprésenté": false
        },
        {
            "childs": ["theo"],
            "data": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Deceased
            },
            "member_id": "alphonse",
            "isReprésentant": false,
            "isReprésenté": false
        },
        {
            "childs": [],
            "data": {
                "degre": 3,
                "ordre": 1,
                "status": Status.Valid
            },
            "member_id": "theo",
            "isReprésentant": false,
            "isReprésenté": false
        },
    ]

    const {value} = representation(
        Family.create({value: 
            deadAlphonse.map(heir => Heir.create({value: heir}))}))

    expect(value
        .filter(heir => heir.isReprésentant)
        .find(heir => heir.member_id === "alphonse"))
        .toBeFalsy()

})