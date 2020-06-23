import { DevolutionPresenter } from './devolution/devolutionPresenter'
import { getQualification } from './qualification/index'
import { Family, Member } from './devolution/entities'

export async function getSolution (memberList: Member[], deCujusId: string) {
    
    const devolution = new DevolutionPresenter()
    const qualification = await getQualification(memberList, deCujusId)

    return devolution.getDevolution(Family.create(qualification.task))
}