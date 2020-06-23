import { Status, Family, assignFenteAscendante } from '..'

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
                "paternal_grand_mother"
            ],
            "attributes": {
                "degre": 3,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_grand_mother1"
        },
        {
            "childs": [
                "paternal_grand_mother"
            ],
            "attributes": {
                "degre": 3,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_grand_father1"
        },
        {
            "childs": [
                "paternal_grand_father"
            ],
            "attributes": {
                "degre": 3,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_grand_father2"
        },
        {
            "childs": [
                "paternal_grand_father"
            ],
            "attributes": {
                "degre": 3,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_grand_mother2"
        },
        {
            "childs": [
                "paternal_grand_grand_mother2"
            ],
            "attributes": {
                "degre": 4,
                "ordre": 3,
                "status": Status.Valid
            },
            "member_id": "paternal_grand_grand_grand_father"
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

    const father = solution.findMember('father')!
    const paternal_grand_father = solution.findMember('paternal_grand_father')!
    const paternal_grand_mother = solution.findMember('paternal_grand_mother')!

    const paternal_grand_grand_father1 = solution.findMember('paternal_grand_grand_father1')!
    const paternal_grand_grand_mother1 = solution.findMember('paternal_grand_grand_mother1')!
    const paternal_grand_grand_father2 = solution.findMember('paternal_grand_grand_father2')!
    const paternal_grand_grand_mother2 = solution.findMember('paternal_grand_grand_mother2')!

    const paternal_grand_grand_grand_father = solution.findMember('paternal_grand_grand_grand_father')!

    const mother = solution.findMember('mother')!
    const maternal_grand_father = solution.findMember('maternal_grand_father')!
    const maternal_grand_grand_father = solution.findMember('maternal_grand_grand_father')!

    expect(father.attributes.branch).toStrictEqual('paternelle')
    expect(paternal_grand_father.attributes.branch).toStrictEqual('paternelle')
    expect(paternal_grand_mother.attributes.branch).toStrictEqual('paternelle')

    expect(paternal_grand_grand_father1.attributes.branch).toStrictEqual('paternelle')
    expect(paternal_grand_grand_mother1.attributes.branch).toStrictEqual('paternelle')
    expect(paternal_grand_grand_father2.attributes.branch).toStrictEqual('paternelle')
    expect(paternal_grand_grand_mother2.attributes.branch).toStrictEqual('paternelle')

    expect(paternal_grand_grand_grand_father.attributes.branch).toStrictEqual('paternelle')

    expect(mother.attributes.branch).toStrictEqual('maternelle')
    expect(maternal_grand_father.attributes.branch).toStrictEqual('maternelle')
    expect(maternal_grand_grand_father.attributes.branch).toStrictEqual('maternelle')  
})