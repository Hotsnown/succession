import { Family, LegalRight, Refine, Ordre, Member } from '../../../entities'
import { repartitionParTête, excludeInheligible } from '../../inference'
import { assignFenteAscendante } from '../../qualification/Fente'

export const extractFente: Refine = (family) => {
    const { maternals, paternals } = assignFenteAscendante(family).getBranches()

    if (nobodyRemainingIn(maternals)) {
       return repartitionParTête(paternals, family)
    } else if (nobodyRemainingIn(paternals)) {
       return repartitionParTête(maternals, family)
    } else {
       //TODO: remove hard coded find
       if (!family.findMember('mother') || !family.findMember('father')) throw new Error('No mother/father found')
       return Family.create(
          [
             ...repartitionParTête(paternals, paternals, LegalRight.percent('50%')).members,
             ...repartitionParTête(maternals, maternals, LegalRight.percent('50%')).members,
          ]
       )
    }
}

function nobodyRemainingIn(side: Family): boolean {
    return excludeInheligible(side).members.length === 0
 }