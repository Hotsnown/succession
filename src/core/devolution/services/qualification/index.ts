import treeParser from '../tree-parser/tree-parser'
import { main } from './main'
import { RawTree } from '../../../../client/features/ExpertSystem/Interface'

export function getQualification(data: RawTree, deCujus: string, rootId: string) {

    const res = treeParser(data, deCujus)
    res.family.forEach((o, index) => o.index = index)
    //@ts-ignore
    return main(res, rootId)
}