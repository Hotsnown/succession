/* prettier-ignore */
/*eslint-disable*/

import { Controller } from './devolution/controller'
import treeParser from './devolution/services/tree-parser/tree-parser'
import { RawTree } from '../client/features/ExpertSystem/Interface'
import { main } from './devolution/services/qualification/main'

export function getSolution (memberList: RawTree, deCujusId: string, rootId: string) {
    
    const devolution = new Controller()

    const getQualification = (data: RawTree, deCujus: string, rootId: string) => {
        const res = treeParser(data, deCujus)
        res.family.forEach((o, index) => o.index = index)
        //@ts-ignore
        return main(res, rootId)
    }

    //@ts-ignore
    return devolution.getDevolution(getQualification(memberList, deCujusId, rootId).family, deCujusId)
}