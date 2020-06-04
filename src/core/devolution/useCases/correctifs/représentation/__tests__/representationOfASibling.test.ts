import { representationOfASibling } from '..'
import { Status } from '../../../../entities'


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
            "member_id": "abe"
        },
        {
            "childs": [],
            "data": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "data": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "validSibling"
        },
        {
            "childs": ["nephew"],
            "data": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "deadSibling"
        },
        {
            "childs": [],
            "data": {
                "degre": 3,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "nephew"
        },
    ]

    expect(representationOfASibling(firstOrderHeirs)
        .filter(heir => heir.isReprésentant)
        .find(heir => heir.member_id === "nephew"))
        .toBeTruthy()
    
    expect(representationOfASibling(firstOrderHeirs)
        .filter(heir => heir.isReprésentant))
        .toHaveLength(1)

    expect(representationOfASibling(firstOrderHeirs)
        .filter(heir => heir.isReprésenté)
        .find(heir => heir.member_id === "deadSibling"))
        .toBeTruthy()

    expect(representationOfASibling(firstOrderHeirs)
        .filter(heir => heir.isReprésenté))
        .toHaveLength(1)
})