import { Heir, Family } from '../entities'

type Parents = [Heir, Heir]

export const findParents = (heirs: Family, childName: string): Parents  => {
    const result = heirs.value.filter(heir => heir.props.value.childs.includes(childName))
    return [result[0], result[1]]
}