import { Status, Family } from '../../../entities'
import { getSolution } from '../..'

describe("Respect de l'incpacité", () => {
    it('should not give legalRights when there is no heirs', () => {
        const noMember = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "deCujus"
            }
        ]
    
        const family = Family.create(noMember)
        const deCujus = getSolution(family).findMember('deCujus')
    
        expect(deCujus.legalRights).toBe('unassigned')
    })

    it('should not not give legalRights to deceased members in Degre1', () => {
        const oneDeadInSameDegree = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "maggie"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadSon"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "validSon"
            }
        ]

        const solution = getSolution(Family.create(oneDeadInSameDegree))
        const validSon = solution.findMember('validSon')
        const deadSon = solution.findMember('deadSon')
        expect(validSon.legalRights).toBe(1)
        expect(deadSon.legalRights).toBe(0)
    })

    it('should not give legalRights to deceased members in Degre2', () => {
        const oneDeadInSameDegreeTwo = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "maggie"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadSon"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandSon"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "validGrandSon"
            }
        ]

        const solution = getSolution(Family.create(oneDeadInSameDegreeTwo))
        const deadGrandSon = solution.findMember('deadGrandSon')
        const validGrandSon = solution.findMember('validGrandSon')

        expect(deadGrandSon.legalRights).toBe(0)
        expect(validGrandSon.legalRights).toBe(1)

    })
})

describe('Respect du degré', () => {
    it('should give equal shares between first degree', () => {
        const firstDegreeMember = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "abe"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "child1"
            },
            {
                "childs": [
                    "millhouse_jr"
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "child2"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "child3"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandchild"
            },
        ]
    
        const solution = getSolution(Family.create(firstDegreeMember))
        const child1 = solution.findMember('child1')
        const child2 = solution.findMember('child2')
        const child3 = solution.findMember('child3')
        const grandchild = solution.findMember('grandchild')
    
        expect(child1.legalRights).toStrictEqual(1/3)
        //@ts-ignore
        expect(child1.legalRights + child2.legalRights + child3.legalRights).toStrictEqual(1)
        expect(grandchild.legalRights).toStrictEqual(0)
    })
    it('should give equal shares between second degree ', () => {
        const secondDegreesMembers = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "abe"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "bart"
            },
            {
                "childs": [
                    "millhouse_jr"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "lisa"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "millhouse_jr"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "maggie"
            },
        ]
        const solution = getSolution(Family.create(secondDegreesMembers))
        const lisa = solution.findMember('lisa')
        const maggie = solution.findMember('maggie')
        const bart = solution.findMember('bart')
        const millhouse_jr = solution.findMember('millhouse_jr')
    
        expect(lisa.legalRights).toBe(1/3)
        expect(maggie.legalRights).toBe(1/3)
        expect(bart.legalRights).toBe(1/3)
        expect(millhouse_jr.legalRights).toBe(0)
    })
    
    it('should give equal shares between third degree', () => {
        const thirdDegreesMembers = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Valid
                },
                "member_id": "deCujus"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadSon"
            },
            {
                "childs": [
                    "millhouse_jr"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandGrandchild1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandGrandchild2"
            }
        ]
    
        const solution = getSolution(Family.create(thirdDegreesMembers))
        const grandGrandchild1 = solution.findMember('grandGrandchild1')
        const grandGrandchild2 = solution.findMember('grandGrandchild2')
        const deadSon = solution.findMember('deadSon')
    
        expect(grandGrandchild1.legalRights).toStrictEqual(1/2)
        expect(grandGrandchild2.legalRights).toStrictEqual(1/2)
        expect(deadSon.legalRights).toStrictEqual(0)
    })
    
    it('should give equal shares between fourth degree', () => {
        const fourthDegreesMembers = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "deCujus"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadSon"
            },
            {
                "childs": [
                    "millhouse_jr"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 4,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandGrandGrandchild"
            }
        ]
    
        const solution = getSolution(Family.create(fourthDegreesMembers))
        const deadGrandchild2 = solution.findMember('deadGrandchild')
        const grandGrandGrandchild1 = solution.findMember('grandGrandGrandchild')
    
        expect(deadGrandchild2.legalRights).toStrictEqual(0)
        expect(grandGrandGrandchild1.legalRights).toStrictEqual(1)
    })

    it('should give equal shares between fifth degree', () => {
        const fifthDegreesMembers = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "deCujus"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadSon"
            },
            {
                "childs": [
                    "millhouse_jr"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 4,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandGrandGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 5,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandGrandGrandGrandchild"
            }
        ]

        const solution = getSolution(Family.create(fifthDegreesMembers))
        const grandGrandGrandGrandchild = solution.findMember('grandGrandGrandGrandchild')
    
        expect(grandGrandGrandGrandchild.legalRights).toStrictEqual(1)
    })

    it('should give equal shares between sixth degree', () => {
        const sixthDegree = [
            {
                "childs": [],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "deCujus"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadSon"
            },
            {
                "childs": [
                    "millhouse_jr"
                ],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 4,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandGrandGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 5,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadGrandGrandGrandGrandchild"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 6,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandGrandGrandGrandGrandchild"
            }

        ]

        const solution = getSolution(Family.create(sixthDegree))
        const grandGrandGrandGrandGrandchild = solution.findMember('grandGrandGrandGrandGrandchild')
    
        expect(grandGrandGrandGrandGrandchild.legalRights).toStrictEqual(1)
    })
})

describe('Respect de la représentation', () => {

    it('should give 50% to a normal heir and distribute 50% to the souche', () => {
        const oneRepresentant = [
            {
                "childs": [
                    "représenté",
                    "normalHeir"
                ],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "deCujus"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "normalHeir"
            },
            {
                "childs": [
                    "représentant1",
                    "représentant2"
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "représenté"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "représentant1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "représentant2"
            }
        ]
    
        const solution = getSolution(Family.create(oneRepresentant))
        const normalHeir = solution.findMember('normalHeir')
        const représentant1 = solution.findMember('représentant1')
        const représentant2 = solution.findMember('représentant2')
        const représenté = solution.findMember('représenté')
        expect(représentant1.legalRights).toStrictEqual(1/4)
        expect(représentant2.legalRights).toStrictEqual(1/4)
        expect(normalHeir.legalRights).toStrictEqual(1/2)
        expect(représenté.legalRights).toStrictEqual(0)

    })

    it('should give 2/3 to two normals heirs and distribute 1/3 to the souche', () => {
        const oneRepresentéTwoNormalHeirsThreeRepresentants = [
            {
                "childs": [
                    "représenté",
                    "normalHeir"
                ],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "deCujus"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "normalHeir1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "normalHeir2"
            },
            {
                "childs": [
                    "représentant1",
                    "représentant2",
                    "représentant3"
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "représenté"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "représentant1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "représentant2"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "représentant3"
            }
        ]
    
        const solution = getSolution(Family.create(oneRepresentéTwoNormalHeirsThreeRepresentants))

        const normalHeir1 = solution.findMember('normalHeir1')
        const normalHeir2 = solution.findMember('normalHeir2')
        const représentant1 = solution.findMember('représentant1')
        const représentant2 = solution.findMember('représentant2')
        const représentant3 = solution.findMember('représentant3')
        const représenté = solution.findMember('représenté')

        expect(représentant1.legalRights).toStrictEqual(1/9)
        expect(représentant2.legalRights).toStrictEqual(1/9)
        expect(représentant3.legalRights).toStrictEqual(1/9)
        expect(normalHeir1.legalRights).toStrictEqual(1/3)
        expect(normalHeir2.legalRights).toStrictEqual(1/3)
        expect(représenté.legalRights).toStrictEqual(0)

    })

    it('should work with recursive representation', () => {
        const recursiveReprésentation = [
            {
                "childs": [
                    "représenté",
                    "normalHeir"
                ],
                "attributes": {
                    "degre": 0,
                    "ordre": 0,
                    "status": Status.Deceased
                },
                "member_id": "deCujus"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "normalHeir"
            },
            {
                "childs": [
                    "représentant1",
                    "représentant2",
                    "deadReprésentant"
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "représenté"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "représentant1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "représentant2"
            },
            {
                "childs": [
                    "recursiveReprésentanté"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadReprésentant"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "recursiveReprésentanté"
            }
        ]
    
        const solution = getSolution(Family.create(recursiveReprésentation))

        const normalHeir = solution.findMember('normalHeir')!
        const représentant1 = solution.findMember('représentant1')
        const représentant2 = solution.findMember('représentant2')
        const deadReprésentant = solution.findMember('deadReprésentant')
        const représenté = solution.findMember('représenté')
        const recursiveReprésentanté = solution.findMember('recursiveReprésentanté')

        expect(représentant1.legalRights).toStrictEqual(1/6)
        expect(représentant2.legalRights).toStrictEqual(1/6)
        expect(normalHeir.legalRights).toStrictEqual(1/2)
        expect(représenté.legalRights).toStrictEqual(0)
        expect(deadReprésentant.legalRights).toStrictEqual(0)
        expect(recursiveReprésentanté.legalRights).toStrictEqual(1/6)
    })

})