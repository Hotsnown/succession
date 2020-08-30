import { Family, LegalRight } from '../../../entities'
import { repartitionParTête, excludeInheligible } from '..'
import { assignFenteAscendante } from '../../qualification/Fente'

export const répartitionParBranche = (family: Family, shares: LegalRight = LegalRight.percent('100%')): Family => {
   console.log('ICI')
   family.debug()
   const { maternals, paternals } = assignFenteAscendante(family).getBranches()

    if (nobodyRemainingIn(maternals, family)) {
       return Family.create(
           [
                ...repartitionParTête(paternals, family).members,
                ...maternals.members.map(member => member.copyWith({ legalRights: LegalRight.percent('0%') })),
                family.deCujus.copyWith({ legalRights: LegalRight.percent('0%') })
           ],
           family.deCujus.member_id)
    } else if (nobodyRemainingIn(paternals, family)) {
       return Family.create(
           [
               ...repartitionParTête(maternals, family).members,
               ...paternals.members.map(member => member.copyWith({ legalRights: LegalRight.percent('0%') })),
               family.deCujus.copyWith({ legalRights: LegalRight.percent('0%') })
           ],
           family.deCujus.member_id)
    } else {
       //TODO: remove hard coded find
       if (!family.findMember('mother') || !family.findMember('father')) throw new Error('No mother/father found')
       return Family.create(
          [
             ...repartitionParTête(paternals, paternals, divideBy2(shares), family.deCujus.member_id).members,
             ...repartitionParTête(maternals, maternals, divideBy2(shares), family.deCujus.member_id).members,
             family.findMember('father').copyWith({ legalRights: LegalRight.percent('0%')}),
             family.deCujus.copyWith({ legalRights: LegalRight.percent('0%') }) //??
          ],
          family.deCujus.member_id
       )
    }
}

function nobodyRemainingIn(side: Family, wholeFamily: Family): boolean {
    return excludeInheligible(side, wholeFamily).members.length === 0
 }

 function divideBy2(shares: LegalRight): LegalRight {
    return shares.dividedBy(LegalRight.create(1, 2))
 }