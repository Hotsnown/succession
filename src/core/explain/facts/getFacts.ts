import { Family, Ordre, Status, Degree } from "../../devolution/entities";
import { Facts, booleanfr } from "./Interface"
import { Degrees, getFirstAppliableOrdreNumber, byOrdre, atLeastOneMemberEligibleToInheritIn } from '../../devolution/services/inference'
import { nobodyRemainingIn } from "../../devolution/services/inference/utils/RépartitionParBranche"
import { assignFenteAscendante } from "../../devolution/services/qualification/Fente"

export function getFacts(family: Family, memberId: string): Facts {
    return {
        "nombreDeMembresDuDegreSuccessible" : nombreDeMembresDuDegreSuccessible(family, family),
        "nombreDeMembresDeLordreFictif" : nombreDeMembresDeLordreFictif(family),
        "estRepresentant": getEstRepresentant(family, memberId),
        "nEstPasRepresentant": getNEstPasRepresentant(family, memberId),
        "nombreDeParents": getNombreDeParent(family) as 1 | 2,
        "nombreDeBranches": getNombreDeBranche(family),
        "estParent": getEstParent(family, memberId),
        "ordrePrivilegie": getOrdrePrivilegie(family),
        "degreSuccessible": getDegreSuccessible(family),
        "estEpoux": getEstEpoux(family, memberId),
        "epouxExiste": getEpouxExiste(family, memberId),
        "descendantExiste": getDescendantExiste(family),
        "estDescendant": getEstDescendant(family, memberId)
    }
}

function getNombreDeParent (family: Family): number{
    return family.members
        .filter(member => member.isParentOfDeCujus(family))
        .filter(parent => parent.isEligibleToInherit())
        .length
}

function getEstRepresentant (family: Family, memberId: string) {
    return family.findMember(memberId).attributes.isReprésentant ? 'oui' : 'non'
}

function getNEstPasRepresentant(family: Family, memberId: string) {
    return !family.findMember(memberId).attributes.isReprésentant ? 'oui' : 'non'
}

function nombreDeMembresDeLordreFictif (family: Family) {
    return 6
}

function nombreDeMembresDuDegreSuccessible (family: Family, membersToShareBetween: Family) {
    return Degrees
        .create(family)
        .getFirstAppliableDegreeMembers(membersToShareBetween, family)
        .filter(member => member !== undefined && member.isEligibleToInherit() || (member.isReprésenté === true))
        .length
}

function getNombreDeBranche(family: Family): 1 | 2 {
    const {maternals, paternals} = assignFenteAscendante(family).getBranches()
    if (nobodyRemainingIn(maternals, family) || nobodyRemainingIn(paternals, family)) {
        return 1
    } else {
        return 2
    }
}

function getEstParent(family: Family, memberId: string): booleanfr {
    const ret = family.findParentsOfDecujus().some(parent => parent.member_id === memberId)
    if (ret) return "oui"
    else return "non"
}

function getOrdrePrivilegie(family: Family): number {
    return getFirstAppliableOrdreNumber(family)
}

function getDegreSuccessible (family: Family): number{
    const ret = Degrees
                    .create(family)
                    .firstAppliableDegree

    return ret === Degree.Degree6 ? Degree.Degree6 : parseInt(ret)
}

function getEstEpoux(family: Family, memberId: string): booleanfr {
    if (family.deCujus.attributes.spouse === 'without spouse') return 'non'
    return family.deCujus.attributes.spouse
        .map(spouse => family.findMember(spouse))
        .filter(spouse => spouse !== undefined)
        .some(spouse => spouse.member_id === memberId) 
        ? 'oui' : 'non'
}

function getEpouxExiste(family: Family, memberId: string): booleanfr {
    if (family.deCujus.attributes.spouse === 'without spouse') return 'non'
    return family.deCujus.attributes.spouse
        .map(spouseId => family.findMember(spouseId))
        .filter(spouse => spouse !== undefined)
        .some(spouse => spouse.attributes.status === Status.Valid) ? 'oui' : 'non'
}

function getEstDescendant(family: Family, memberId: string): booleanfr {
    return family.findMember(memberId).attributes.ordre === Ordre.Ordre1 ? "oui" : "non"
}

function getDescendantExiste(family: Family): booleanfr {
    if (!family.members.some(member => member.attributes.ordre === Ordre.Ordre1)) return 'non'
    return atLeastOneMemberEligibleToInheritIn(byOrdre(family.members), Ordre.Ordre1.toString()) ? 'oui' : 'non'
}