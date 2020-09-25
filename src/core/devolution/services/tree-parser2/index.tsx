import { MemberConstructor, Status } from "../../entities"
import { GEDCOM } from "./interface"

const treeParser = (memberListFromUI: GEDCOM): MemberConstructor[] => {
    console.log(memberListFromUI)
    return parseGEDCOM(memberListFromUI)
}

function parseGEDCOM(memberListFromUI: GEDCOM): MemberConstructor[] {
    return memberListFromUI.indis.map((indi): MemberConstructor => ({
        member_id: indi.id,
        childs: getChildsFromId(memberListFromUI, indi.id),
        attributes: {
            status: indi.status,
            degre: 'unassigned',
            ordre: 'unassigned',
            spouse: getSpouseFromId(memberListFromUI, indi.id),
            legalRights: 'unassigned',
            branch: 'unassigned',
            isReprésenté: 'unassigned',
            isReprésentant: 'unassigned',
            index: "unassigned"
        }
    }))
}

function getChildsFromId(memberList: GEDCOM, parentId: string): string[] {
    return memberList.fams.find(fam => fam.husb === parentId || fam.wife === parentId)?.children || []
}

function getSpouseFromId(memberList: GEDCOM, memberId: string): 'without spouse' | string[] {
    const fam = memberList.fams.find(fam => fam.husb === memberId || fam.wife === memberId)
    if (!fam) return 'without spouse'
    if (fam.husb === memberId) {
        return [fam.wife]
    } else {
        return [fam.husb]
    }
}

export default treeParser