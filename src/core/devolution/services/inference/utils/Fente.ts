import { Family, LegalRight } from '../../../entities'
import { repartitionParTête, excludeInheligible } from '../../inference'
import { assignFenteAscendante } from '../../qualification/Fente'

export const extractFente = (family: Family, shares: LegalRight = LegalRight.percent('100%')): Family => {
    const { maternals, paternals } = assignFenteAscendante(family).getBranches()

    if (nobodyRemainingIn(maternals)) {
       return Family.create(
           [
                ...repartitionParTête(paternals, family).members,
                ...maternals.map(member => member.copyWith({legalRights: LegalRight.percent('0%')})).members,
                family.deCujus.copyWith({legalRights: LegalRight.percent('0%')})
           ])
    } else if (nobodyRemainingIn(paternals)) {
       return Family.create(
           [
               ...repartitionParTête(maternals, family).members,
               ...paternals.map(member => member.copyWith({legalRights: LegalRight.percent('0%')})).members,
               family.deCujus.copyWith({legalRights: LegalRight.percent('0%')})
           ])
    } else {
       //TODO: remove hard coded find
       if (!family.findMember('mother') || !family.findMember('father')) throw new Error('No mother/father found')
       return Family.create(
          [
             ...repartitionParTête(paternals, paternals, halveBetweenSides(shares)).members,
             ...repartitionParTête(maternals, maternals, halveBetweenSides(shares)).members,
             family.deCujus.copyWith({legalRights: LegalRight.percent('0%')})
          ]
       )
    }
}

function nobodyRemainingIn(side: Family): boolean {
    return excludeInheligible(side).members.length === 0
 }

 function halveBetweenSides(shares: LegalRight): LegalRight {
    return shares.dividedBy(LegalRight.create(1, 2))
 }