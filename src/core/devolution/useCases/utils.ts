import { Heir, Solution, LegalRights, Family } from '../entities'

type Parents = [Heir, Heir]

export const findParents = (heirs: Family, childName: string): Parents  => {
    const result = heirs.value.filter(heir => heir.props.value.childs.includes(childName))
    return [result[0], result[1]]
}

/* export const assignLegalRights = 
    (Heir: Heir, legalRights: number): Solution => ({ ...Heir, legalRights: LegalRights.create(legalRights) }); */