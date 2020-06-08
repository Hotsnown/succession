import { repartitionParTête } from './useCases/principe/withoutSpouse'
import { Family } from './entities'

type IDevolution = {
    getDevolution: (allMembers: Family) => Family
}

export class DevolutionPresenter {
    devolutionEngine: IDevolution
    constructor(devolutionEngine: IDevolution = {getDevolution: repartitionParTête}) {
        this.devolutionEngine = devolutionEngine
    }

    getDevolution(allMembers: Family) {
        return this.devolutionEngine.getDevolution(allMembers)
    }
}