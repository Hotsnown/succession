import { Family, Devolution, Member, Status, Qualification } from '../entities'

//TODO potential bug when there is only one parent in input

export function OrdreTwoStrategy(family: Family): Family {
    // 1/ QUALIFICATION
    //    Nombre de collatéraux = nombre de membres du degrés le plus proche + nombre de souche
    //    Nombre de parent survivant
    // 2/ CALCUL
    //    si parent survivant = 1 : 50% + 50% / nombre de collatéraux (ne pas oublier la représentation)
    //    si parent survivant = 2 : 25% + 25% + 50% / nombre de collatéraux (ne pas oublier la représentation)
    //    si parent survivant = 0
    //
    const parents = family
        .findParentsOf(family.deCujus.member_id)
        .filter(parent => parent.isEligibleToInherit())

    switch(parents.length) {
        case 1: return oneParentStrategy(family, parents)
        case 2: return twoParentsStrategy(family, parents)
        case 0: return normalStrategy(family)
        default: throw new Error('Should not be reachable')
    }
    } 

    function normalStrategy(family: Family): Family {
        const qualification = new Qualification(family).assignRepresentation(family)
        const devolution = new Devolution(qualification)

        const représentantsExist = qualification.members.some(member => member.isReprésentant)

        if (représentantsExist) {
            return devolution.computeRepresentation(qualification)
        } else {
            return devolution.repartitionParTête(qualification, qualification)
        }
    }

    function oneParentStrategy(family: Family, parents: Member[]): Family {

        const devolution = new Devolution(family)

        const familyWithoutParents = Family.create(family.members.filter(member => !isParent(parents, member)))
        const priviledgedMembers = devolution.repartitionParTête(familyWithoutParents, familyWithoutParents, 1/2)

        return family.copyWith(family.members
           .map(member => isParent(parents, member)
              ? member.copyWith({ legalRights: 1 / 2 })
              : member.copyWith({ legalRights: priviledgedMembers.findMember(member.member_id).legalRights})))
     }

     function twoParentsStrategy(family: Family, parents: Member[]): Family {
        const devolution = new Devolution(family)

        const familyWithoutParents = Family.create(family.members.filter(member => !isParent(parents, member)))
        const priviledgedMembers = devolution.repartitionParTête(familyWithoutParents, familyWithoutParents, 1/2)

        return family.copyWith(family.members
           .map(member => member.copyWith({ legalRights: isParent(parents, member) ? 1 / 4 : priviledgedMembers.findMember(member.member_id).legalRights })))
     }
     
     function isParent(parents: Member[], member: Member) {
        return parents
           .map(parent => parent.member_id)
           .includes(member.member_id)
     }