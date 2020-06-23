import { getSolutionController } from './services/withoutSpouseStrategy'
import { Family } from './entities'

type IDevolution = {
    getDevolution: (allMembers: Family) => Family
}

export class DevolutionPresenter {
    devolutionEngine: IDevolution
    constructor(devolutionEngine: IDevolution = {getDevolution: getSolutionController}) {
        this.devolutionEngine = devolutionEngine
    }

    getDevolution(allMembers: Family) {
        return this.devolutionEngine.getDevolution(allMembers)
    }
}