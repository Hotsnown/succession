/* prettier-ignore */
/*eslint-disable*/

import { Controller } from './controller'
import treeParser from './services/tree-parser/tree-parser'
import { RawTree } from '../../client/features/ExpertSystem/Interface'
import { main } from './services/qualification/main'
import { Family } from './entities'

export function getSolution (memberList: RawTree, deCujusId: string, rootId: string): Family {
    
    if (memberList.id === undefined) {
        console.error("Error: member list is undefined")
        return (Family.create([]))
    }

    const devolution = new Controller()

    const getQualification = (data: RawTree, deCujus: string, rootId: string) => {
        const res = treeParser(data, deCujus)
        res.family.forEach((o, index) => o.index = index)
        //@ts-ignore
        const family = Family.create(res.family, rootId)
        console.log(family)
        return main(family)
    }

    return devolution.getDevolution(getQualification(memberList, deCujusId, rootId).members)
}