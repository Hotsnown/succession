import treeParser from './tree-parser/tree-parser'
import getQualificationFrom from './request-builder/request-builder'

function getDevolution(data: any) {
    return getQualificationFrom(treeParser(data, 'abe'))
}

export default getDevolution