import { Status } from '../../../entities/index'
import { Family } from '../../../entities/Family'
import { getFirstAppliableOrdreNumber, byOrdre } from '..'

it('should return ordre 3 when there is no priviledged collateral', () => {
    const noPriviledgeCollateral = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
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
                "ordre": 3,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "father"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "siblingOfDecujus"
        },
        {
            "childs": [
                "de_cujus"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 3,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
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
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
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
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "paternal_grand_father"
        }
    ]

    const family = Family.create(noPriviledgeCollateral)
    const ordre3 = getFirstAppliableOrdreNumber(family)

    expect(ordre3).toStrictEqual(3)
})

it('should return ordre 2 when there is priviledged collaterals', () => {
    const noPriviledgeCollateral = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
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
                "ordre": 3,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "father"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "siblingOfDecujus"
        },
        {
            "childs": [
                "de_cujus"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 3,
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
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
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
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
                "status": Status.Valid,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "paternal_grand_father"
        }
    ]

    const family = Family.create(noPriviledgeCollateral)
    const ordre2 = getFirstAppliableOrdreNumber(family)

    expect(ordre2).toStrictEqual(2)
})

it('should test ordre on real attributes', () => {
    const test = [
        {
          "childs": [],
          "attributes": {
            "status": Status.Deceased,
            'degre': 'unassigned',
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "unknown",
        },
        {
          "childs": [],
          "attributes": {
            "status": Status.Valid,
            'degre': 'unassigned',
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "mona",
        },
        {
          "childs": [],
          "attributes": {
            "degre": 1,
            "ordre": 1,
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "herb"
        },
        {
          "childs": [],
          "attributes": {
            'degre': 'unassigned',
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "marge",
        },
        {
          "childs": [],
          "attributes": {
            "degre": 2,
            "ordre": 1,
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "bart"
        },
        {
          "childs": [],
          "attributes": {
            "degre": 'unassigned',
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "millhouse",
        },
        {
          "childs": [],
          "attributes": {
            "degre": 3,
            "ordre": 1,
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "millhouse_jr",
        },
        {
          "childs": [
            "millhouse_jr"
          ],
          "attributes": {
            "degre": 2,
            "ordre": 1,
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "lisa",
        },
        {
          "childs": [],
          "attributes": {
            "degre": 'unassigned',
            "status": Status.Deceased,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "undefined"
        },
        {
          "childs": [],
          "attributes": {
            "degre": 2,
            "ordre": 1,
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
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
            "ordre": 1,
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "homer"
        },
        {
          "childs": [
            "herb",
            "homer"
          ],
          "attributes": {
            "degre": 0,
            "ordre": 0,
            "status": Status.Valid,
            "spouse": "",
            "legalRights": "unassigned" as 'unassigned',
            "branch": "unassigned" as 'unassigned',
            "isReprésentant": "unassigned" as 'unassigned',
            "isReprésenté": "unassigned" as 'unassigned',
          },
          "member_id": "abe",
        }
      ]
      //@ts-ignore
      const sut = Family.create(test)
      expect(sut).toBeTruthy()
})