import { findParents } from '../utils'
import { Status, Family, Member } from '../../entities'

it('should find the parents of a member', () => {
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

    const family = Family.create( 
        secondOrdreMembers.map(member => Member.create(member))
        )

    expect(
        findParents(family, 'maggie')
        .find(member => member.member_id === 'homer'))
        .toBeTruthy()
})