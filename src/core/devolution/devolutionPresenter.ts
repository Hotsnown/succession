import { repartitionParTête } from './useCases/principe/withoutWife'
import { Heir, Solution } from './entities'

type IDevolution = {
    getDevolution: (allHeirs: Heir[]) => Solution[]
}

export class DevolutionPresenter {
    devolutionEngine: IDevolution
    constructor(devolutionEngine: IDevolution = {getDevolution: repartitionParTête}) {
        this.devolutionEngine = devolutionEngine
    }

    getDevolution(allHeirs: Heir[]) {
        return this.devolutionEngine.getDevolution(allHeirs)
    }
}