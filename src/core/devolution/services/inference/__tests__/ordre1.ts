import { Status, Family } from '../../../entities'
import { main } from '../main'

describe("Inheligible wise", () => {
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
        const deCujus = main(family, 'deCujus').findMember('deCujus')!
    
        expect(deCujus.legalRights).toBe('unqualified')
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

        const solution = main(Family.create(oneDeadInSameDegree), 'deCujus')
        const validSon = solution.findMember('validSon')!
        const deadSon = solution.findMember('deadSon')!
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

        const solution = main(Family.create(oneDeadInSameDegreeTwo), 'deCujus')
        const deadGrandSon = solution.findMember('deadGrandSon')!
        const validGrandSon = solution.findMember('validGrandSon')!

        expect(deadGrandSon.legalRights).toBe(0)
        expect(validGrandSon.legalRights).toBe(1)

    })
})

describe('Degree wise', () => {
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
    
        const solution = main(Family.create(firstDegreeMember), 'deCujus')
        const child1 = solution.findMember('child1')!
        const child2 = solution.findMember('child2')!
        const child3 = solution.findMember('child3')!
        const grandchild = solution.findMember('grandchild')!
    
        expect(child1.legalRights).toStrictEqual(1/3)
        expect(child2.legalRights).toStrictEqual(1/3)
        expect(child3.legalRights).toStrictEqual(1/3)
        expect(grandchild.legalRights).toStrictEqual(0)
    })
    it('should give equal shares between second degree ', () => {
        const secondDegreesMembers = [
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
                "childs": [
                    "grandchildren1",
                    "grandchildren2",
                    "grandchildren3",
                ],
                "attributes": {
                    "degre": 1,
                    "ordre": 2,
                    "status": Status.Deceased
                },
                "member_id": "deadSon"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandchildren1"
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
                "member_id": "grandchildren2"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandgrandchildren"
            },
            {
                "childs": [
                    "grandgrandchildren"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "grandchildren3"
            },
        ]
        const solution = main(Family.create(secondDegreesMembers), 'deCujus')
        const deCujus = solution.findMember('deCujus')!
        const deadSon = solution.findMember('deadSon')!
        const grandchildren1 = solution.findMember('grandchildren1')!
        const grandchildren2 = solution.findMember('grandchildren2')!
        const grandchildren3 = solution.findMember('grandchildren3')!
        const grandgrandchildren = solution.findMember('grandgrandchildren')!
    
        expect(deCujus.legalRights).toBe(0)
        expect(deadSon.legalRights).toBe(0)
        expect(grandchildren1.legalRights).toBe(1/3)
        expect(grandchildren2.legalRights).toBe(1/3)
        expect(grandchildren3.legalRights).toBe(1/3)
        expect(grandgrandchildren.legalRights).toBe(0)
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
    
        const solution = main(Family.create(thirdDegreesMembers), 'deCujus')
        const grandGrandchild1 = solution.findMember('grandGrandchild1')!
        const grandGrandchild2 = solution.findMember('grandGrandchild2')!
        const deadSon = solution.findMember('deadSon')!
    
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
    
        const solution = main(Family.create(fourthDegreesMembers), 'deCujus')
        const deadGrandchild2 = solution.findMember('deadGrandchild')!
        const grandGrandGrandchild1 = solution.findMember('grandGrandGrandchild')!
    
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

        const solution = main(Family.create(fifthDegreesMembers), 'deCujus')
        const grandGrandGrandGrandchild = solution.findMember('grandGrandGrandGrandchild')!
    
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

        const solution = main(Family.create(sixthDegree), 'deCujus')
        const grandGrandGrandGrandGrandchild = solution.findMember('grandGrandGrandGrandGrandchild')!
    
        expect(grandGrandGrandGrandGrandchild.legalRights).toStrictEqual(1)
    })
})

describe('Représentation wise', () => {

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
    
        const solution = main(Family.create(oneRepresentant), 'deCujus')

        const normalHeir = solution.findMember('normalHeir')!
        const représentant1 = solution.findMember('représentant1')!
        const représentant2 = solution.findMember('représentant2')!
        const représenté = solution.findMember('représenté')!

        expect(normalHeir.legalRights).toStrictEqual(1/2)
        expect(représentant1.legalRights).toStrictEqual(1/4)
        expect(représentant2.legalRights).toStrictEqual(1/4)
        expect(représenté.legalRights).toStrictEqual(0)

    })

    it('should give 2/3 to two normals heirs and distribute 1/3 to the souche', () => {
        const oneRepresentéTwoNormalHeirsThreeRepresentants = [
            {
                "childs": [
                    "représenté",
                    "normalHeir1",
                    "normalHeir2"
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
    
        const solution = main(Family.create(oneRepresentéTwoNormalHeirsThreeRepresentants), 'deCujus')

        const normalHeir1 = solution.findMember('normalHeir1')!
        const normalHeir2 = solution.findMember('normalHeir2')!
        const représentant1 = solution.findMember('représentant1')!
        const représentant2 = solution.findMember('représentant2')!
        const représentant3 = solution.findMember('représentant3')!
        const représenté = solution.findMember('représenté')!

        expect(normalHeir1.legalRights).toStrictEqual(1/3)
        expect(normalHeir2.legalRights).toStrictEqual(1/3)
        expect(représentant1.legalRights).toStrictEqual(1/9)
        expect(représentant2.legalRights).toStrictEqual(1/9)
        expect(représentant3.legalRights).toStrictEqual(1/9)
        expect(représenté.legalRights).toStrictEqual(0)

    })

    it('should work with sub-representation', () => {
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
        const family = Family.create(recursiveReprésentation)
        const solution = main(family, 'deCujus')

        const normalHeir = solution.findMember('normalHeir')!
        const représentant1 = solution.findMember('représentant1')!
        const représentant2 = solution.findMember('représentant2')!
        const deadReprésentant = solution.findMember('deadReprésentant')!
        const représenté = solution.findMember('représenté')!
        const recursiveReprésentanté = solution.findMember('recursiveReprésentanté')!

        expect(normalHeir.legalRights).toStrictEqual(1/2)
        expect(représentant1.legalRights).toStrictEqual(1/6)
        expect(représentant2.legalRights).toStrictEqual(1/6)
        expect(représenté.legalRights).toStrictEqual(0)
        expect(deadReprésentant.legalRights).toStrictEqual(0)
        expect(recursiveReprésentanté.legalRights).toStrictEqual(1/6)
    })

    it('should work with grandson of sub-representation', () => {
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
                    "sonOfdeadReprésentant"
                ],
                "attributes": {
                    "degre": 2,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "deadReprésentant1"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 3,
                    "ordre": 1,
                    "status": Status.Deceased
                },
                "member_id": "sonOfdeadReprésentant"
            },
            {
                "childs": [],
                "attributes": {
                    "degre": 4,
                    "ordre": 1,
                    "status": Status.Valid
                },
                "member_id": "SUT"
            }
        ]
        const family = Family.create(recursiveReprésentation)
        const solution = main(family, 'deCujus')

        const normalHeir = solution.findMember('normalHeir')!
        const représentant1 = solution.findMember('représentant1')!
        const représentant2 = solution.findMember('représentant2')!
        const deadReprésentant1 = solution.findMember('deadReprésentant1')!
        const représenté = solution.findMember('représenté')!
        const sonOfdeadReprésentant = solution.findMember('sonOfdeadReprésentant')!
        const SUT = solution.findMember('SUT')!

        expect(normalHeir.legalRights).toStrictEqual(1/2)
        expect(représentant1.legalRights).toStrictEqual(1/6)
        expect(représentant2.legalRights).toStrictEqual(1/6)
        expect(représenté.legalRights).toStrictEqual(0)
        expect(deadReprésentant1.legalRights).toStrictEqual(0)
        expect(sonOfdeadReprésentant.legalRights).toStrictEqual(0)
        expect(SUT.legalRights).toStrictEqual(1/6)
    })

})