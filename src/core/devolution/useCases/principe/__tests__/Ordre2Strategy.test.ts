import { Status, Family } from '../../../entities'
import { repartitionParTête } from '../..'

describe('test ordre 2', () => {
    it('should pass to ordre 2 when there is no ordre 1', () => {
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

        const family = repartitionParTête(Family.create(secondOrdreMembers))
        const homer = family.findMember('homer')
    
        expect(homer.legalRights).toBe(1)
    })
})