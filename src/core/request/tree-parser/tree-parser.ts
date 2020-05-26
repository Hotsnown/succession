import { Tree, Node, HouseHold } from './interface'
import { Output } from './entities'

function treeParser(tree: any, deCujus: string) {
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
        if (houseHold !== undefined && !isEmpty(houseHold) ) {
            if (hasMultipleChildren(houseHold)) {
                extractMultipleChildren(getChildrenString(houseHold), facts, parent)
            }
            else {
                getChildrenArray(houseHold)
                    .map(extractSingleChildren(facts, parent))
            }
        }
        else {
            facts.appendFamily(parent, [])
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

function extractMultipleChildren(childrens: string[], facts: Output, parent: string) {
    facts.appendFamily(parent, childrens)
}

function extractSingleChildren(facts: Output, parent: string) {
    return (children: any) =>  facts.appendFamily(parent, children.id)
}

function isEmpty(obj: Object) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}