import treeParser from './tree-parser/tree-parser'
import getQualificationFrom from './request-builder/request-builder'
import { RawTree } from '../../client/features/Main/Interface'

export function getQualification(data: RawTree, deCujus: string) {
    return getQualificationFrom(treeParser(data, deCujus))
}