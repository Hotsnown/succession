import { Tree, Node, HouseHold } from './interface'
import { Output } from './entities'

function treeParser(tree: Tree) {
    const facts: Output = new Output("abe")

    Object.entries(tree)
        .map(parseNode(facts))

    return facts
}

export default treeParser

function parseNode(facts: Output): (value: [string, Node], index: number, array: [string, Node][]) => void {
    return node => {
        const parent = node[0]
        const houseHold = node[1].children
        if (houseHold !== undefined && !isEmpty(houseHold) ) {
            console.log(Object.values(houseHold))
            if (Object.values(houseHold).length) {
                facts.appendFamily(parent, getChildrenString(houseHold))
            }
            else {
                //@ts-ignore
                facts.appendFamily(parent, getSingleChildren(houseHold).id)
                console.log(getSingleChildren(houseHold))
            }
        }
        else {
            facts.appendFamily(parent, [])
        }
    }
}

function getChildrenString(houseHold: HouseHold): string[] {
    return Object.values(houseHold).flat(1)
}

function getSingleChildren(houseHold: HouseHold): string[] {
    return Object.values(houseHold)[0]
}

function isEmpty(obj: Object) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}