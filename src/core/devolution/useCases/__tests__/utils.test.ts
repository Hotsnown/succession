import { findParents } from '../utils'
import { Status, Family, Heir } from '../../entities'

it('should find the parents of a heir', () => {
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

    const family = Family.create({value: 
        secondOrdreHeirs.map(heir => Heir.create({value: heir}))
        })

    expect(
        findParents(family, 'maggie')
        .find(heir => heir.member_id === 'homer'))
        .toBeTruthy()
})