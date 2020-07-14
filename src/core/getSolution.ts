import { Controller } from './devolution/controller'
import { getQualification } from './qualification/index'
import { RawTree } from '../client/features/ExpertSystem/Interface'

export function getSolution (memberList: RawTree, deCujusId: string, rootId: string) {
    
    const devolution = new Controller()

    //@ts-ignore
    return devolution.getDevolution(getQualification(memberList, deCujusId, rootId).family, deCujusId)
}