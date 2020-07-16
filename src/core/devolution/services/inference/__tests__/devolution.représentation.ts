import { Status, Family } from '../../../entities'
import { assignRepresentation } from '../../qualification/Représentation'
import { computeRepresentation } from '..'

it('should not give to the représentant the same right as the other members when representant is dead', () => {
    const oneRepresentantOneValid = [
        {
            "childs": [
                "homer",
                "validDescendant"
            ],
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
            "member_id": "abe"
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
        "member_id": "validDescendant"
        },
        {
            "childs": [
                "alphonse",
            ],
            "attributes": {
                "degre": 1,
                "ordre": 1,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Deceased,
                "spouse": "",
                "legalRights": "unassigned" as 'unassigned',
                "branch": "unassigned" as 'unassigned',
                "isReprésentant": "unassigned" as 'unassigned',
                "isReprésenté": "unassigned" as 'unassigned',
            },
            "member_id": "alphonse"
        },
    ]

    const family = Family.create(oneRepresentantOneValid)
    const qualification = assignRepresentation(family)
    const solution = computeRepresentation(qualification)

    const alphonse = solution.findMember('alphonse')!
    const validDescendant = solution.findMember('validDescendant')!

    expect(alphonse.legalRights.valueOf()).toStrictEqual(0)
    expect(validDescendant.legalRights.valueOf()).toStrictEqual(1)
})