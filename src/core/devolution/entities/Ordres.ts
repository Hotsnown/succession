import { ValueObject } from '../../shared/domain/value-objects'
import { Member, Family } from '.';
import * as R from 'ramda'

interface OrdreProps {
    value: Record<string, Member[]>
    ordres: Ordre[]
}

export enum Ordre {
    Ordre1 = 1, 
    Ordre2,
    Ordre3,
    Ordre4
}

/**
 * @desc Members are divided into four classes where each classe exclude other classes.
 *  If there are no members in one class, the property goes to all the members in the next class.
 */
export class Ordres extends ValueObject<OrdreProps> {

    public static create(members: Family): Ordres {
        if (members === undefined || members === null || members.members.length < 0) {
            throw new Error()
        } else {
            return new Ordres(
                {
                    value: byOrdre(members.members),
                    ordres: [Ordre.Ordre1, Ordre.Ordre2, Ordre.Ordre3, Ordre.Ordre4],
                })
        }
    }

    get value() {
        return this.props.value;
    }

    getFirstAppliableOrdre (): Family {
        for (const ordre in this.props.ordres) {
            if (this.props.value[ordre] !== undefined) {
                if(this.atLeastOneMemberEligibleToInheritIn(ordre)) {
                    return Family.create(this.props.value[ordre])
                }
            }
        }
        return Family.create([]) //TODO Error handling
    }

    private atLeastOneMemberEligibleToInheritIn(ordre: string) {
        return this.props.value[ordre].some(member => member.isEligibleToInherit());
    }

    getFirstAppliableOrdreNumber (family: Family): number {
        for (const ordre of this.props.ordres) {
            if (this.props.value[ordre] !== undefined) {
                if(this.atLeastOneMemberEligibleToInheritIn(ordre.toString())) {
                    if (parseInt(ordre.toString()) === 2) {
                        return this.computePriviledgeAscendantOrdre(family)
                    }    
                    return parseInt(ordre.toString()) //TODO: handle unknown case
                }
            }
        }
        return 10 //TODO Error handling
    }

    private computePriviledgeAscendantOrdre(family: Family) {
        const parents = family.findParentsOf(family.deCujus.member_id)
        if (this.noPriviledgedCollateral(family, parents)) {
            return 3
        } else {
            return 2
        }
    }

    private noPriviledgedCollateral(family: Family, parents: [Member, Member]) {
        return family.members
            .filter(member => !parents.includes(member))
            .filter(member => member.attributes.ordre === 2)
            .filter(member => member.isEligibleToInherit())
            .length === 0;
    }
}

const byOrdre = R.groupBy(
    (member: Member) => {
        const ordre = member.attributes.ordre
        return  ordre === 'unassigned' ? 'unassigned' :
                ordre === 1 ? '1' :
                ordre === 2 ? '2' :
                ordre === 3 ? '3' :
                ordre === 4 ? '4' : 'unknown'
        })
