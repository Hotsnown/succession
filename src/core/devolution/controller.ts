import { Family, MemberConstructor } from './entities'
import { main } from './services/main'

export class Controller {

    getDevolution(pythonOutput: MemberConstructor[], deCujusId: string): Family {
        const rawFamily = Family.create(pythonOutput)
        const family = Family.create(rawFamily.members.filter(member => member !== undefined))
        try {
            return main(family, deCujusId)
        } catch(e) {
            console.error(e)
            family.debug()
            return family
        }
    }
}