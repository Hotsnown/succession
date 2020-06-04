import { Heir } from '../entities'
import { AwareOfRepresentation } from './correctifs/représentation'

export const findParents = (heirs: Heir[], childName: string): AwareOfRepresentation[] => heirs.filter(heir => heir.childs.includes(childName))
