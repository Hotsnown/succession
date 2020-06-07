import { repartitionParTête } from './useCases/principe/withoutWife'
import { Family } from './entities'

type IDevolution = {
    getDevolution: (allHeirs: Family) => Family
}

export class DevolutionPresenter {
    devolutionEngine: IDevolution
    constructor(devolutionEngine: IDevolution = {getDevolution: repartitionParTête}) {
        this.devolutionEngine = devolutionEngine
    }

    getDevolution(allHeirs: Family) {
        return this.devolutionEngine.getDevolution(allHeirs)
    }
}