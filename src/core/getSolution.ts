import { Controller } from './devolution/controller'
import { getQualification } from './qualification/index'
import { RawTree } from '../client/features/ExpertSystem/Interface'

export async function getSolution (memberList: RawTree, deCujusId: string) {
    
    const devolution = new Controller()
    const qualification = await getQualification(memberList, deCujusId)

    return devolution.getDevolution(qualification.task, deCujusId)
}