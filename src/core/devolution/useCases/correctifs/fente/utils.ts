import { Member, Family, Degree, Ordre } from '../../../entities'
import { findParents } from "../../utils";

//TODO : refactor to use degrees / ordre

export const isParentOfDeCujus =
    (family: Family, deCujus: Member): Member[] => 
        family.members.filter(member => member.member_id ===
            findParents(family, deCujus.member_id)[0].member_id ||
            findParents(family, deCujus.member_id)[1].member_id)

export const isMother =
    (member: Member) => member.attributes.degre === Degree.Degree1 && 
                        member.attributes.ordre === Ordre.Ordre2 &&
                        member.member_id === 'mother'

export const isFather =
    (member: Member) => member.attributes.degre === Degree.Degree1 && 
                        member.attributes.ordre === Ordre.Ordre2 &&
                        member.member_id === 'father'

export const isAscendantOfMother =
    (members: Member[], family: Family): Member[] =>
        members
            .filter(member => member !== undefined)
            .filter(member => isMother(member))
            .map(mother => findParents(family, mother.member_id)[0])
            .filter(ascendantOfMother => ascendantOfMother !== undefined)
            .map(ascendantOfMother => family.findMember(ascendantOfMother.member_id))

export const isAscendantOfFather =
    (members: Member[], family: Family): Member[] =>
        members
            .filter(member => member !== undefined)
            .filter(member => isFather(member))
            .map(mother => findParents(family, mother.member_id)[0])
            .filter(ascendantOfMother => ascendantOfMother !== undefined)
            .map(ascendantOfMother => family.findMember(ascendantOfMother.member_id))
