import { getSolution } from './services/withoutSpouseStrategy'
import { Family } from './entities'

type IDevolution = {
    getDevolution: (allMembers: Family) => Family
}

export class DevolutionPresenter {
    devolutionEngine: IDevolution
    constructor(devolutionEngine: IDevolution = {getDevolution: getSolution}) {
        this.devolutionEngine = devolutionEngine
    }

    getDevolution(allMembers: Family) {
        return this.devolutionEngine.getDevolution(allMembers)
    }
}