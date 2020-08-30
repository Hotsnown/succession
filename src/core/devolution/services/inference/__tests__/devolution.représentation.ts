import { Status, Family, MemberConstructor } from '../../../entities'
import { assignRepresentation } from '../../qualification/Représentation'
import { répartitionParSouche } from '..'

it('should not give to the représentant the same right as the other members when representant is dead', () => {
    const oneRepresentantOneValid:MemberConstructor[] = [
        {
            "childs": [
                "homer",
                "validDescendant"
            ],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased,
                "spouse": [''],
                "legalRights": "unassigned",
                "branch": "unassigned",
                "isReprésentant": "unassigned",
                "isReprésenté": "unassigned",
            },
            "member_id": "abe"
        },
        {
        "childs": [],
        "attributes": {
            "degre": 1,
            "ordre": 1,
            "status": Status.Valid,
            "spouse": [''],
            "legalRights": "unassigned",
            "branch": "unassigned",
            "isReprésentant": "unassigned",
            "isReprésenté": "unassigned",
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
                "spouse": [''],
                "legalRights": "unassigned",
                "branch": "unassigned",
                "isReprésentant": "unassigned",
                "isReprésenté": "unassigned",
            },
            "member_id": "homer"
        },
        {
            "childs": [],
            "attributes": {
                "degre": 2,
                "ordre": 1,
                "status": Status.Deceased,
                "spouse": [''],
                "legalRights": "unassigned",
                "branch": "unassigned",
                "isReprésentant": "unassigned",
                "isReprésenté": "unassigned",
            },
            "member_id": "alphonse"
        },
    ]

    const family = Family.create(oneRepresentantOneValid, 'abe')
    const qualification = assignRepresentation(family)
    const solution = répartitionParSouche(qualification)

    const alphonse = solution.findMember('alphonse')!
    const validDescendant = solution.findMember('validDescendant')!

    expect(alphonse.legalRights.valueOf()).toStrictEqual(0)
    expect(validDescendant.legalRights.valueOf()).toStrictEqual(1)
})