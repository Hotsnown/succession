import { Tree, Node, HouseHold } from './interface'
import { Output } from './entities'

type Status = 'valid' | 'invalid'

function treeParser(tree: any, deCujus: string): Output {
    let facts: Output = new Output(deCujus)

    Object.entries(tree)
        .map(parseNode(facts))

    return facts
}

export default treeParser

function parseNode(facts: Output) {
    return (node: any) => {
        let parent = node[0]
        let houseHold = node[1].children
        console.log( )
        if (houseHold !== undefined && !isEmpty(houseHold) ) {
            if (hasMultipleChildren(houseHold)) {
                extractMultipleChildren(getChildrenString(houseHold), facts, parent, node[1].status)
            }
            else {
                getChildrenArray(houseHold)
                    .map(extractSingleChildren(facts, parent, node[1].status))
            }
        }
        else {
            facts.appendFamily(parent, [], node[1].status)
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