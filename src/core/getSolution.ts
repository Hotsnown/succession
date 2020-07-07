import { DevolutionPresenter } from './devolution/devolutionPresenter'
import { getQualification } from './qualification/index'
import { Family } from './devolution/entities'
import { RawTree } from '../client/features/Main/Interface'

export async function getSolution (memberList: RawTree, deCujusId: string) {
    
    const devolution = new DevolutionPresenter()
    const qualification = await getQualification(memberList, deCujusId)

    return devolution.getDevolution(Family.create(qualification.task))
}