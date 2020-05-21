import { Tree, Node, HouseHold } from './interface'
import { Output } from './json'

export function treeParser(tree: Tree) {
    let facts: Output = new Output("Pierre")

    Object.entries(tree)
        .map(parseNode(facts))

    return facts
}

function parseNode(facts: Output): (value: [string, Node], index: number, array: [string, Node][]) => void {
    return node => {
        let parent = node[0]
        let houseHold = node[1].children
        if (houseHold) {
            if (hasMultipleChildren(houseHold)) {
                getChildren(houseHold)
                    .map(childrens => extractMultipleChildren(childrens, facts, parent))
            }
            else {
                getChildren(houseHold)
                    .map(extractSingleChildren(facts, parent))
            }
        }
    }
}

function getChildren(houseHold: HouseHold) {
    return Object.values(houseHold)
}

function hasMultipleChildren(houseHold: HouseHold) {
    return getChildren(houseHold).length
}

function extractMultipleChildren(childrens: string[], facts: Output, parent: string) {
    return childrens
        .map(extractSingleChildren(facts, parent))
}

function extractSingleChildren(facts: Output, parent: string) {
    return (children: any) => facts.appendFamily(parent, children)
}