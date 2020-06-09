import { assignRepresentation } from '../extractReprésentationAttribute'
import { Status, Family, Member } from '../../../../entities'


it('should be appliable when members are child of a sibling', () => {
    const firstOrderMembers = [
        {
            "childs": [
                "homer",
                "sibling"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "abe"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "validSibling"
        },
        {
            "childs": ["nephew"],
            "attributes": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "deadSibling"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 3,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "nephew"
        },
    ]

    const {members} = assignRepresentation(
        Family.create( firstOrderMembers))
                
    expect(members
        .filter(member => member.isReprésentant)
        .find(member => member.member_id === "nephew"))
        .toBeTruthy()
    
    expect(members
        .filter(member => member.isReprésentant))
        .toHaveLength(1)

    expect(members
        .filter(member => member.isReprésenté)
        .find(member => member.member_id === "deadSibling"))
        .toBeTruthy()

    expect(members
        .filter(member => member.isReprésenté))
        .toHaveLength(1)
})