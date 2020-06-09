import { Status, Family, Member } from '../../../../entities'
import { assignFenteAscendante } from '../fente'
it('should find both fente', () => {
    const existingFente = [
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
            ],
            "attributes": {
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
            "attributes": {
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
            "attributes": {
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
            "attributes": {
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
            "attributes": {
                "degre": 3,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "maternal_grand_grand_father"
        }
    ]

    const family = Family.create(existingFente)
    const solution = assignFenteAscendante(family)

    expect(solution.members
        .find(member => member.member_id === 'father')
        ?.attributes.branch)
        .toStrictEqual('paternelle')
    
    expect(solution.members
        .find(member => member.member_id === 'paternal_grand_father')
        ?.attributes.branch)
        .toStrictEqual('paternelle')

    expect(solution.members
        .find(member => member.member_id === 'mother')
        ?.attributes.branch)
        .toStrictEqual('maternelle')
 
    expect(solution.members
        .find(member => member.member_id === 'maternal_grand_father')
        ?.attributes.branch)
        .toStrictEqual('maternelle')
    
    expect(solution.members
        .find(member => member.member_id === 'maternal_grand_grand_father')
        ?.attributes.branch)
        .toStrictEqual('maternelle')    
})