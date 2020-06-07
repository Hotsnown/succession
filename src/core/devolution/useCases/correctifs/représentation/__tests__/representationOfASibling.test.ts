import { representation } from '../extractReprésentationAttribute'
import { Status, Family, Heir } from '../../../../entities'


it('should be appliable when heirs are child of a sibling', () => {
    const firstOrderHeirs = [
        {
            "childs": [
                "homer",
                "sibling"
            ],
            "data": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "abe",
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
        },
        {
            "childs": [],
            "data": {
                "degre": 0,
                "ordre": 0,
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
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "validSibling",
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
        },
        {
            "childs": ["nephew"],
            "data": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "deadSibling",
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
        },
        {
            "childs": [],
            "data": {
                "degre": 3,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "nephew",
            "isReprésentant": false,
            "isReprésenté": false,
            "legalRights": 0
        },
    ]

    const {value} = representation(
        Family.create({value: 
            firstOrderHeirs.map(heir => Heir.create({value: heir}))}))
        
    expect(value
        .filter(heir => heir.isReprésentant)
        .find(heir => heir.member_id === "nephew"))
        .toBeTruthy()
    
    expect(value
        .filter(heir => heir.isReprésentant))
        .toHaveLength(1)

    expect(value
        .filter(heir => heir.isReprésenté)
        .find(heir => heir.member_id === "deadSibling"))
        .toBeTruthy()

    expect(value
        .filter(heir => heir.isReprésenté))
        .toHaveLength(1)
})