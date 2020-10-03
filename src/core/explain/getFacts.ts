import { Family, Ordre } from "../devolution/entities";
import { Facts, booleanfr } from "./facts"
import { Degrees, getFirstAppliableOrdreNumber, byOrdre, atLeastOneMemberEligibleToInheritIn } from '../devolution/services/inference'
import { nobodyRemainingIn } from "../devolution/services/inference/utils/RépartitionParBranche"
import { assignFenteAscendante } from "../devolution/services/qualification/Fente"

export function getFacts(family: Family, memberId: string): Facts {
    return {
        "nombreDeMembresDuDegreSuccessible" : nombreDeMembresDuDegreSuccessible(family, family),
        "nombreDeMembresDeLordreFictif" : 2,
        "estRepresentant": getEstRepresentant(family, memberId),
        "nombreDeParents": getNombreDeParent(family) as 1 | 2,
        "nombreDeBranches": getNombreDeBranche(family),
        "estParent": getEstParent(family, memberId),
        "ordre1Applicable": getOrdreApplicable(Ordre.Ordre1, family),
        "ordre2Applicable": getOrdreApplicable(Ordre.Ordre2, family),
        "ordre3Applicable": getOrdreApplicable(Ordre.Ordre3, family),
        "ordre4Applicable": getOrdreApplicable(Ordre.Ordre4, family),
        "estEpoux": getEstEpoux(family, memberId),
        "epouxExiste": getEpouxExiste(family, memberId),
        "descendantExiste": getDescendantExiste(family),
        "estDescendant": getEstDescendant(family, memberId)
    }
}

function getNombreDeParent (family: Family): number{
    return family.members
        .filter(member => member.isParentOfDeCujus(family))
        .map(member => {console.log(member.member_id); return member})
        .filter(parent => parent.isEligibleToInherit())
        .length
}

function getEstRepresentant (family: Family, memberId: string) {
    return family.findMember(memberId).attributes.isReprésentant ? 'oui' : 'non'
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

function getOrdreApplicable(ordre: Ordre, family: Family): booleanfr {
    const strategy = getFirstAppliableOrdreNumber(family)
    return ordre === strategy ? "oui" : "non"
}

function getEstEpoux(family: Family, memberId: string): booleanfr {
    if (family.deCujus.attributes.spouse === 'without spouse') return 'non'
    return family.deCujus.attributes.spouse
        .map(spouse => family.findMember(spouse))
        .some(spouse => spouse.member_id === memberId) 
        ? 'oui' : 'non'
}

function getEpouxExiste(family: Family, memberId: string): booleanfr {
    if (family.deCujus.attributes.spouse === 'without spouse') return 'non'
    else return 'oui'
}

function getEstDescendant(family: Family, memberId: string): booleanfr {
    return family.findMember(memberId).attributes.ordre === Ordre.Ordre1 ? "oui" : "non"
}

function getDescendantExiste(family: Family): booleanfr {
    if (!family.members.some(member => member.attributes.ordre === Ordre.Ordre1)) return 'non'
    return atLeastOneMemberEligibleToInheritIn(byOrdre(family.members), Ordre.Ordre1.toString()) ? 'oui' : 'non'
}