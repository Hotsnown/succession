import { Family, Degrees, Ordres, Representable, Member } from '../entities'

interface Heir extends Member { }

export class Devolution {
    family: Family
    heirs: Heir[]
    n: number

    constructor(family: Family) {
        this.family = family
        this.heirs = []
        this.n = 0
    }

    /**
   * Members in the most favored class inherit to exclusion of other classes.
   */
    getMostFavoredMembersByOrdre(): Family {
        return Ordres
            .create(this.family)
            .getFirstAppliableOrdre()
    }

    /**
     * The nearest relation in a class, determined by counting degrees,
     * inherit to the exclusion of more distant relatives in that class.
     * @param filteredMembers members in the most favored class
     */
    getMostFavoredMembersByDegre(mostFavoredOrder: Family): Member[] {
        return Degrees
            .create(this.family)
            .getFirstAppliableDegreeMembers(mostFavoredOrder, this.family)
    }

    /** 
     * Each heir who comes to the succession of their chief 
     * receives a share corresponding to their own vocation,
     *  that is to say the share which is personally assigned to them. 
     * */
    repartitionParTête(filteredMembers: Family, family: Family): Family {

        const shareByHead = (members: Member[]): number => 1 / members.length    

        const appliableDegree = Degrees
            .create(family)
            .getFirstAppliableDegreeMembers(filteredMembers, family)

        return family.copyWith(family.members
            .map(member => 
                member.copyWith({ legalRights: member.isIn(appliableDegree) 
                    ? shareByHead(appliableDegree) 
                    : 0 })
            ))
    }

    excludeInheligible(family: Family): Family {
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
    computeRepresentation(family: Family): Family {       
        this.n = this.n + 1
        const immutableFamily = this.repartitionParTête(this.family, this.family)
        const getSameDegres = (n: number): Family => {
            switch(n) {
                case 1: return this.repartitionParTête(Family.create(Degrees.create(family).getMembersOfDegre(1, family)), family)
                case 2: return Family.create(Degrees.create(family).getMembersOfDegre(2, family))
                default: throw new Error('Should not be reached')
            }
        }

        //base condition
        if(this.n === 3) {
            return family
        } else {
            return this.computeRepresentation(this.assignLegalRightsComputation(family, getSameDegres(this.n), immutableFamily))
        }
    }

    assignLegalRightsComputation(family: Family, sameDegres: Family, immutableFamily: Family): Family {        
        for (const member of sameDegres.members) {
            if (isSouche(member)) {
                return distributeReprésentéShareBetweenReprésentant(sameDegres, member, family, immutableFamily, this.n)
            }
        }
        return family
    }
}

const isSouche = (sameDegre: Member): Representable => sameDegre.isReprésenté

function distributeReprésentéShareBetweenReprésentant(sameDegres: Family, member: Member, family: Family, immutableFamily: Family, n: number): Family {
    return n === 1
        ? sameDegres
            .copyWith(updatedSouche(member, family)
                .concat(updatedReprésenté(family, 'représenté'))
                .concat(otherMembers(immutableFamily)))
        : sameDegres
            .copyWith(updatedSouche(member, family)
                .concat(updatedReprésenté(sameDegres, 'deadReprésentant'))
                .concat(otherMembers(immutableFamily))
                .concat(addReprésentants(family))
                .concat(family.findMember('représenté')))
}

const equalShareIn = (souche: Member): number => (souche.legalRights as number) / souche.childs.length
const updatedSouche = (sameDegre: Member, family: Family) => {
    return sameDegre.childs
        .filter(souche => souche !== undefined)
        .map(souche => family.findMember(souche))
        .filter(souche => souche !== undefined)
        .filter(souche => souche.isReprésentant)
        .map(souche => souche.copyWith({ legalRights: equalShareIn(sameDegre) }))
}

const otherMembers = (immutableFamily: Family): ConcatArray<Member> => {
    return immutableFamily.members.filter(other => other.member_id.startsWith('normal') || 
                                          other.member_id.startsWith('recursive') ||
                                          other.member_id.startsWith('deCujus'))                         
}

const updatedReprésenté = (sameMember: Family, target: string): Member => {
    return sameMember.findMember(target).copyWith({ legalRights: 0 })
}

const addReprésentants = (family: Family): Member[]=> {
    return [family.findMember('représentant1'), family.findMember('représentant2')]
}