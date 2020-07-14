import { Family, MemberConstructor } from './entities'
import { main } from './services/inference/main'

export class Controller {

    getDevolution(rawMemberList: MemberConstructor[], deCujusId: string): Family {
        
        if (!isValidMemberList(rawMemberList)) console.error(`Invalid input: ${rawMemberList.filter(member => !isValidMember(member))}`)

        const family = Family.create(
            Family.create(rawMemberList).members.filter(member => member !== undefined)
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

function isValidMemberList(rawMemberList: MemberConstructor[]): boolean {
    return rawMemberList.every(o => isValidMember(o))
}

function isValidMember(pythonMember: any): pythonMember is MemberConstructor {
    return pythonMember.childs !== undefined &&
           pythonMember.member_id !== undefined &&
           pythonMember.attributes.degre !== undefined &&
           pythonMember.attributes.ordre !== undefined &&
           pythonMember.attributes.status !== undefined;
}