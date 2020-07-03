import treeParser from './tree-parser/tree-parser'
import getQualificationFrom from './request-builder/request-builder'

export function getQualification(data: any, deCujus: any) {

    if (!data.task) {
        throw new Error('Server has not been found. Please set it up.')
    }

    return getQualificationFrom(treeParser(data, deCujus))
}