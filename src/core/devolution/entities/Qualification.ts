import { Family } from "./Family"

export class Qualification {
    family: Family

    constructor(family: Family) {
        this.family = family
    }

    /**
     * If a descendant or a sibling predeceases the de cujus, his share goes to his descendants
     * by representation.
     * @param members Family structure under examination
     * @example If a father leaves property to his daughter, and at his 
     * death the daughter has already died, leaving two grandchildren, the grandchildren would 
     * take their mother’s share.
     **/
    assignRepresentation(): Family {

        const assignReprésenté =
            (family: Family) =>
                family.copyWith(family.members.map(member =>
                    member.copyWith({isReprésenté : member.isReprésentéIn(family)})))

        const assignReprésentant =
            (family: Family) =>
                family.copyWith(family.members.map(member =>
                    member.copyWith({isReprésentant : member.isReprésentantIn(family)})))
        
        return assignReprésentant(assignReprésenté(this.family))
    }
}