import { Status } from '../../../../entities'
import { fenteAscendante } from '../fente'
it('should find both fente', () => {
    const existingFente = [
        {
            "childs": [],
            "data": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Deceased
            },
            "member_id": "de_cujus"
        },
        {
            "childs": [
                "de_cujus",
            ],
            "data": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "father"
        },
        {
            "childs": [
                "de_cujus"
            ],
            "data": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Deceased
            },
            "member_id": "mother"
        },
        {
            "childs": [
                "father"
            ],
            "data": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_father"
        },
        {
            "childs": [
                "mother"
            ],
            "data": {
                "degre": 2,
                "ordre": 3,
                "status": Status.Deceased
            },
            "member_id": "maternal_grand_father"
        },
        {
            "childs": [
                "maternal_grand_father"
            ],
            "data": {
                "degre": 3,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "maternal_grand_grand_father"
        },
    ]

    const data = fenteAscendante(existingFente)
/*     expect(fenteAscendante(existingFente)
        .filter(heir => heir.branch === 'paternelle'))
        .toHaveLength(2)

    expect(fenteAscendante(existingFente)
        .filter(heir => heir.branch === 'maternelle'))
        .toHaveLength(2) */
})