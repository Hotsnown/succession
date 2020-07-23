/* prettier-ignore */
/*eslint-disable*/

export interface Tree {
    [key: string]: Node
}

export interface Node {
    id: string;
    name: string;
    partners?: string[];
    children?: HouseHold;
}

export interface HouseHold {
    [key: string]: string[]
}