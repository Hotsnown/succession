interface Tree {
    [key: string]: Node
}

interface Node {
    id: string;
    name: string;
    partners?: string[];
    children?: HouseHold;
}

interface HouseHold {
    [key: string]: string[]
}

export function treeParser(tree: Tree) {
    let facts: string[] = []

    Object.entries(tree)
        .map(
            node => {

                let parent = node[0]
                let houseHold = node[1]["children"]

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
            })

    return facts
}

function getChildren(houseHold: HouseHold) {
    return Object.values(houseHold)
}

function hasMultipleChildren(houseHold: HouseHold) {
    return getChildren(houseHold).length
}

function extractSingleChildren(facts: string[], parent: string): (value: string[], index: number, array: string[][]) => number {
    return children => facts.push(`parent(${parent}, ${children}).`)
}

function extractMultipleChildren(childrens: string[], facts: string[], parent: string): number[] {
    return childrens
        .map((children: any) => facts.push(`parent(${parent}, ${children}).`))
}
