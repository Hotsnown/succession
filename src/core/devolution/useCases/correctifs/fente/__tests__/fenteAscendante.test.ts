import { Status } from '../../../../entities'
import { fenteAscendante } from '../fente'
it('should find both fente', () => {
    const existingFente = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "de_cujus",
            "isReprésenté": false,
            "isReprésentant": false,
            "legalRights": 0
        },
        {
            "childs": [
                "de_cujus",
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "father",
            "isReprésenté": false,
            "isReprésentant": false,
            "legalRights": 0
        },
        {
            "childs": [
                "de_cujus"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "mother",
            "isReprésenté": false,
            "isReprésentant": false,
            "legalRights": 0
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
            "member_id": "paternal_grand_father",
            "isReprésenté": false,
            "isReprésentant": false,
            "legalRights": 0
        },
        {
            "childs": [
                "mother"
            ],
            "attributes": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Deceased
            },
            "member_id": "maternal_grand_father",
            "isReprésenté": false,
            "isReprésentant": false,
            "legalRights": 0
        },
        {
            "childs": [
                "maternal_grand_father"
            ],
            "attributes": {
                "degre": 3,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "maternal_grand_grand_father",
            "isReprésenté": false,
            "isReprésentant": false,
            "legalRights": 0
        },
    ]

    const attributes = fenteAscendante(existingFente)
/*     expect(fenteAscendante(existingFente)
        .filter(member => member.branch === 'paternelle'))
        .toHaveLength(2)

    expect(fenteAscendante(existingFente)
        .filter(member => member.branch === 'maternelle'))
        .toHaveLength(2) */
})