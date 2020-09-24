import { Output } from "../tree-parser/entities"
import { GEDCOM } from "./interface"

const treeParser = (memberListFromUI: GEDCOM, deCujusId: string): Output => {
    return {
        de_cujus: deCujusId,
        family: memberListFromUI.indis.map(indi => ({
            member_id: indi.id,
            childs: getChildsFromId(memberListFromUI, indi.id),
            attributes: {
                status: "valid",
                spouse: "without spouse"
            }
        })
        ),
        appendFamily: () => {}
    }
}

function getChildsFromId(memberList: GEDCOM, parentId: string): string[] {
    return memberList.fams.find(fam => fam.husb === parentId || fam.wife === parentId)?.children || []
}

export default treeParser