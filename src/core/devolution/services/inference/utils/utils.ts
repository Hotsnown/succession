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

export function excludeInheligible(family: Family, wholeFamily: Family): Family {
    return Family.create(family.members.filter(member => member.isEligibleToInherit()), wholeFamily.deCujus.member_id)
}