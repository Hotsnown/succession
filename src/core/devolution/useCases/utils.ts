import { Member, Family } from '../entities'

type Parents = [Member, Member]

export const findParents = (family: Family, childName: string): Parents  => {
    const result = family.members.filter(member => member.props.value.childs.includes(childName))
    return [result[0], result[1]]
}