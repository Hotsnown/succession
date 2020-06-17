import { Family, Degrees, Ordres, Representable, Member, Parents } from '../entities'
import * as R from 'ramda'

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

    /** 
     * Each heir who comes to the succession of their chief 
     * receives a share corresponding to their own vocation,
     * that is to say the share which is personally assigned to them.
     * @param filteredMembers
     * @param family
     * @param shares
     * */
    public repartitionParTête(filteredMembers: Family, family: Family, shares = 1): Family {

        const priviledgedMembers = Degrees
            .create(family)
            .getFirstAppliableDegreeMembers(filteredMembers, family)
            .filter(member => member.isEligibleToInherit() || member.isReprésenté)

        const getLegalRightsByHead = (member: Member): number => member.isIn(priviledgedMembers) ? shareByHead(priviledgedMembers, shares) : 0
        const shareByHead = (members: Member[], shares: number): number => shares / members.length

        const updatedMembers = family.members
            .map(member => member.copyWith({ legalRights: getLegalRightsByHead(member) }))

        return family.copyWith(updatedMembers)
    }

    public excludeInheligible(family: Family): Family {
        return Family.create(family.members.filter(member => member.isEligibleToInherit()))
    }

    /**
     *  The representatives of the successor predeceased, 
     *  not coming from their leader, are not counted per head, 
     *  but receive together as a lot the share assigned 
     *  to the one they represent.
     * 
     *  1. People of the same degree have the same share.
     *  2. If a member both is deceased and has children, the dead's share
     *     are divided between his child. Repeat first step between childs if
     *     a child is deceased.
     */
    public computeRepresentation(family: Family): Family {

        let recursiveFamily = this.repartitionParTête(family, family)
        for (let n=1; n < 3; n++) {
            const membersOfCurrentDegres = Degrees.getMembersOfDegre(n, recursiveFamily)
            recursiveFamily = this.assignLegalRightsComputation(recursiveFamily, membersOfCurrentDegres)
        }
        return recursiveFamily
    }

    private assignLegalRightsComputation(family: Family, membersOfCurrentDegres: Family): Family {
        const rootOfSouches = souchesIn(membersOfCurrentDegres)
        for (const rootOfsouche of rootOfSouches) { //TODO handle multiple roots
            return Family.create(
                family.members.map(member => updateMember(member, rootOfsouche))
            )
        }
        return family
    }
}

const updateMember = (member: Member, rootOfsouche: Member) => {
    //WARNINF, you may need to use family.findMember(rootOfSourche) 
    //when rootOfSouche is updated before membersOfSouche to prevent race conditions
    if (memberIsPartOfSouche(rootOfsouche, member)) {
        return member.copyWith({ legalRights: distributeSharesOf(rootOfsouche) })
    } else if (memberIsRootOfSouche(member, rootOfsouche)) {
        return member.copyWith({ legalRights: 0 })
    } else {
        return member
    }
}

const distributeSharesOf = (rootOfsouche: Member): number =>
    (rootOfsouche.legalRights as number) / rootOfsouche.childs.length

const memberIsRootOfSouche = (member: Member, rootOfsouche: Member) =>
    member.member_id === rootOfsouche.member_id

const memberIsPartOfSouche = (rootOfsouche: Member, member: Member) => 
    rootOfsouche.childs.includes(member.member_id) && member.isReprésentant

const souchesIn = (membersOfCurrentDegres: Family) =>
    membersOfCurrentDegres.members.filter(member => member.isReprésenté)