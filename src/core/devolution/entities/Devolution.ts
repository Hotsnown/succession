import { Family, Degrees, Ordres, Member } from '../entities'

export class Devolution {
    private family: Family

    constructor(family: Family) {
        this.family = family
    }

    /**
   * Members in the most favored class inherit to exclusion of other classes.
   */
    public getMostFavoredMembersByOrdre(): Family {
        return Ordres
            .create(this.family)
            .getFirstAppliableOrdre()
    }

    /**
     * The nearest relation in a class, determined by counting degrees,
     * inherit to the exclusion of more distant relatives in that class.
     * @param filteredMembers members in the most favored class
     */
    public getMostFavoredMembersByDegre(mostFavoredOrder: Family): Member[] {
        return Degrees
            .create(this.family)
            .getFirstAppliableDegreeMembers(mostFavoredOrder, this.family)
    }

    public excludeInheligible(family: Family): Family {
        return Family.create(family.members.filter(member => member.isEligibleToInherit()))
    }
}
