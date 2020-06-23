import { Status } from '../index'
import { Family } from '../Family'
import { Ordres } from '../Ordres'

it('should return ordre 3 when there is no priviledged collateral', () => {
    const noPriviledgeCollateral = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "de_cujus"
        },
        {
            "childs": [
                "de_cujus",
                "siblingOfDecujus"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "father"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "siblingOfDecujus"
        },
        {
            "childs": [
                "de_cujus"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "mother"
        },
        {
            "childs": [
                "father"
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_mother"
        },
        {
            "childs": [
                "mother"
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_father"
        }
    ]

    const family = Family.create(noPriviledgeCollateral)
    const ordre3 = Ordres.create(family).getFirstAppliableOrdreNumber(family)

    expect(ordre3).toStrictEqual(3)
})

it('should return ordre 2 when there is priviledged collaterals', () => {
    const noPriviledgeCollateral = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "de_cujus"
        },
        {
            "childs": [
                "de_cujus",
                "siblingOfDecujus"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "father"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "siblingOfDecujus"
        },
        {
            "childs": [
                "de_cujus"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid
            },
            "member_id": "mother"
        },
        {
            "childs": [
                "father"
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_mother"
        },
        {
            "childs": [
                "mother"
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_father"
        }
    ]

    const family = Family.create(noPriviledgeCollateral)
    const ordre2 = Ordres.create(family).getFirstAppliableOrdreNumber(family)

    expect(ordre2).toStrictEqual(2)
})

it('should test ordre on real data', () => {
    const test = [
        {
          "childs": [],
          "data": {},
          "member_id": "unknown"
        },
        {
          "childs": [],
          "data": {},
          "member_id": "mona"
        },
        {
          "childs": [],
          "data": {
            "degre": 1,
            "ordre": 1
          },
          "member_id": "herb"
        },
        {
          "childs": [],
          "data": {},
          "member_id": "marge"
        },
        {
          "childs": [],
          "data": {
            "degre": 2,
            "ordre": 1
          },
          "member_id": "bart"
        },
        {
          "childs": [],
          "data": {},
          "member_id": "millhouse"
        },
        {
          "childs": [],
          "data": {
            "degre": 3,
            "ordre": 1
          },
          "member_id": "millhouse_jr"
        },
        {
          "childs": [
            "millhouse_jr"
          ],
          "data": {
            "degre": 2,
            "ordre": 1
          },
          "member_id": "lisa"
        },
        {
          "childs": [],
          "data": {},
          "member_id": "undefined"
        },
        {
          "childs": [],
          "data": {
            "degre": 2,
            "ordre": 1
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
            "ordre": 1
          },
          "member_id": "homer"
        },
        {
          "childs": [
            "herb",
            "homer"
          ],
          "data": {
            "degre": 0,
            "ordre": 0
          },
          "member_id": "abe"
        }
      ]
      
      const sut = Ordres.create(Family.create(newObject))
      expect(sut).toBeTruthy()
})