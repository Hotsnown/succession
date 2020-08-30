import { Family, Member, LegalRight, Degree } from '../../../entities';
import { assignRepresentation } from '../../qualification/Représentation';
import { repartitionParTête, répartitionParSouche } from '..';

export function répartitionEnConcoursPèreOuMère(family: Family, parents: Member[]): Family {

    const familyWithoutParents = Family.create(family.members.filter(member => !member.isParentOfDeCujus(family)), family.deCujus.member_id);
    const priviledgedMembers = repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%'));
    return Family.create([
        ...parents.map(member => member.copyWith({ legalRights: LegalRight.percent('50%') })),
        ...priviledgedMembers.members,
    ], family.deCujus.member_id);
}

export function répartitionEnConcoursPèreEtMère(family: Family, parents: Member[]): Family {

    const qualifiedFamily = assignRepresentation(family);
    const doReprésentantsExist = qualifiedFamily.members.some(member => member.isReprésentant);
    const familyWithoutParents = Family.create(family.members.filter(member => !member.isParentOfDeCujus(family)), family.deCujus.member_id);
    const qualifiedFamilyWithoutParents = assignRepresentation(familyWithoutParents);

    if (doReprésentantsExist) {
        return Family.create([
            ...répartitionParSouche(qualifiedFamilyWithoutParents, Degree.Degree2, LegalRight.percent('50%')).members,
            ...parents.filter(member => member !== undefined).map(member => member.copyWith({ legalRights: LegalRight.percent('25%') }))
        ], family.deCujus.member_id);
    }
    else {
        return Family.create([
            ...repartitionParTête(familyWithoutParents, familyWithoutParents, LegalRight.percent('50%')).members,
            ...parents.map(member => member.copyWith({ legalRights: LegalRight.percent('25%') }))
        ], family.deCujus.member_id);
    }
}
