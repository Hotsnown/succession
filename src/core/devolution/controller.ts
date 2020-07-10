import { Family, MemberConstructor } from './entities'
import { main } from './services/inference/main'

export class Controller {

    getDevolution(pythonOutput: MemberConstructor[], deCujusId: string): Family {
        
        if (!isValidPythonOutput(pythonOutput)) throw new Error()

        const family = Family.create(
            Family.create(pythonOutput).members.filter(member => member !== undefined)
            )

        try {
            return main(family, deCujusId)
        } catch(e) {
            console.error(e)
            family.debug()
            return family
        }
    }
}

function isValidPythonOutput(pythonOutput: MemberConstructor[]): boolean {
    return pythonOutput.every(o => isMemberConstructor(o))
}

function isMemberConstructor(pythonMember: any): pythonMember is MemberConstructor {
    return pythonMember.childs !== undefined &&
           pythonMember.member_id !== undefined &&
           pythonMember.attributes.degre !== undefined &&
           pythonMember.attributes.ordre !== undefined &&
           pythonMember.attributes.status !== undefined;
}