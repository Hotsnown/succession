/* prettier-ignore */
/*eslint-disable*/

import { Member, Family } from '../../../entities'
import { Degree, Ordre } from '../../../entities'

//TODO : refactor to use degrees / ordre

export const isMother =
    (member: Member) => member.attributes.degre === Degree.Degree1 && 
                        member.attributes.ordre === Ordre.Ordre3 &&
                        member.member_id === 'mother' //TODO distinguer entre la branche paternelle et maternelle

export const isFather =
    (member: Member) => member.attributes.degre === Degree.Degree1 && 
                        member.attributes.ordre === Ordre.Ordre3 &&
                        member.member_id === 'father' //TODO

export const isAscendantOfMother =
    (members: Member[], family: Family): Member[] =>
        members
            .filter(member => member !== undefined)
            .filter(member => isMother(member))
            .flatMap(mother => family.findParentsOf(mother.member_id)
                .filter(ascendantOfMother => ascendantOfMother !== undefined)
                .map(ascendantOfMother => family.findMember(ascendantOfMother.member_id)!)
            )

export const isAscendantOfFather =
    (members: Member[], family: Family): Member[] =>
        members
            .filter(member => member !== undefined)
            .filter(member => isFather(member))
            .flatMap(father => family.findParentsOf(father.member_id)
                .filter(ascendantOfFather => ascendantOfFather !== undefined)
                .map(ascendantOfFather => family.findMember(ascendantOfFather.member_id)!)
                )
                
export function excludeInheligible(family: Family, wholeFamily: Family): Family {
    return Family.create(family.members.filter(member => member.isEligibleToInherit()), wholeFamily.deCujus.member_id)
}