import treeParser from './tree-parser/tree-parser'
import getQualificationFrom from './request-builder/request-builder'

export function getQualification(data: any, deCujus: any) {
    return getQualificationFrom(treeParser(data, deCujus))
}