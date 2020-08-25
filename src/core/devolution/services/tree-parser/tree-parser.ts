/* prettier-ignore */
/*eslint-disable*/

import { HouseHold } from './interface'
import { Output } from './entities'

interface Tree {
    id: string;
    name: string;
    status: Status
    partners: Tree;
    children: Tree
}

type Status = 'valid' | 'invalid'

//TODO : change to traverse tree

function treeParser(tree: Tree, deCujus: string): Output {
    let facts: Output = new Output(deCujus)

    Object.entries(tree)
        .map(parseNode(facts))

    return facts
}

export default treeParser

function parseNode(facts: Output) {
    return (node: any) => {
        let houseHold = node[1].children
        if (houseHold !== undefined && !isEmpty(houseHold) ) {
            if (hasMultipleChildren(houseHold)) {
                extractMultipleChildren(getChildrenString(houseHold), facts, node[1].id, node[1].status)
            }
            else {
                getChildrenArray(houseHold)
                    .map(extractSingleChildren(facts, node[1].id, node[1].status))
            }
        }
        else {
            facts.appendFamily(node[1].id, [], node[1].status)
        }
    }
}

function getChildrenString(houseHold: HouseHold): string[] {
    return Object.values(houseHold).flat(1).map((c: any) => c.id)
}

function getChildrenArray(houseHold: HouseHold) {
    return Object.values(houseHold)
}

function hasMultipleChildren(houseHold: HouseHold) {
    return getChildrenArray(houseHold).length
}

function extractMultipleChildren(childrens: string[], facts: Output, parent: string, status: Status) {
    facts.appendFamily(parent, childrens, status)
}

function extractSingleChildren(facts: Output, parent: string, status: Status) {
    return (children: any) =>  facts.appendFamily(parent, children.id, status)
}

function isEmpty(obj: Object) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}