import treeParser from './tree-parser/tree-parser'
import getQualificationFrom from './request-builder/request-builder'

export function getQualification(data: any, deCujus: any) {
    console.log(getQualificationFrom(treeParser(data, deCujus)))
    return getQualificationFrom(treeParser(data, deCujus))
}