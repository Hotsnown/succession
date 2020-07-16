import { Family } from "../../entities"
import * as R from 'ramda'

/**
 * A representant is a descendant of a predeceased heir (a représenté).
**/
export function assignRepresentation(family: Family): Family {

    const assignReprésenté =
        (family: Family) =>
            family.copyWith(family.members.map(member =>
                member.copyWith({ isReprésenté: member.isReprésentéIn(family) })))

    const assignReprésentant = 
        (family: Family) =>
            family.copyWith(family.members.map(member =>
                member.copyWith({ isReprésentant: member.isReprésentantIn(family) })))

    return R.pipe(
        assignReprésenté,
        assignReprésentant,
    )(family)
}