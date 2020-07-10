import { withoutSpouseStrategy } from './services/withoutSpouse'
import { Family, MemberConstructor, Member } from './entities'
import { withSpouseController } from './services/withSpouse'

export class Controller {

    getDevolution(pythonOutput: MemberConstructor[], deCujusId: string): Family {
        console.log(pythonOutput)
        const rawFamily = Family.create(pythonOutput)
        const spouse = pythonOutput.filter(member => member.member_id === deCujusId)
        const family = Family.create(rawFamily.members.filter(member => member !== undefined))
        try {
            if (family.findMember('spouse')?.member_id) {
                return withSpouseController(family, family.findMember('spouse') as Member)
            }
            return withoutSpouseStrategy(family)
        } catch(e) {
            console.error(e)
            family.debug()
            return family
        }
    }
}