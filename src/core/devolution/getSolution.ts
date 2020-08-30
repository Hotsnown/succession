/* prettier-ignore */
/*eslint-disable*/

import treeParser from './services/tree-parser/tree-parser'
import { getQualification } from './services/qualification/main'
import { getDevolution } from './services/inference/main'
import { Family, MemberConstructor, Status } from './entities'
import { Output } from './services/tree-parser/entities'

import * as R from 'ramda'

export function getSolution (memberListFromUI: any, deCujusId: string, rootId: string): Family {
    
     if (memberListFromUI === undefined) {
        console.error("Error: member list data from UI is undefined")
        return (Family.create([], ''))
    }

    const res = treeParser(memberListFromUI, deCujusId)

    const rawData: MemberConstructor[] = setDefaultAttributes(res)

    const family = Family.create(
        Family.create(rawData, deCujusId, rootId).members.filter(member => member !== undefined),
        deCujusId, 
        rootId
        )

    //TODO convert status 'invalid' | 'valid' to Status here and not in member's constructor
    
    try {
        return R.pipe(
            getQualification,
            getDevolution,
        )(family)
    } catch (e) {
        console.error(e)
        return family
    }
}

function setDefaultAttributes(res: Output) {
    const rawData: MemberConstructor[] = []
    for (let rawMember of res.family) {
        rawData.push({
            member_id: rawMember.member_id,
            attributes: {
                status: rawMember.attributes.status === 'valid' ? Status.Valid : Status.Deceased,
                degre: 'unassigned',
                ordre: 'unassigned',
                spouse: rawMember.attributes.spouse,
                legalRights: 'unassigned',
                branch: 'unassigned',
                isReprésenté: 'unassigned',
                isReprésentant: 'unassigned',
                index: "unassigned"
            },
            childs: rawMember.childs
        })
    }
    return rawData
}
