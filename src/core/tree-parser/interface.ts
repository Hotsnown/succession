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

export interface Data {
}

export interface Family {
    member_id: string;
    childs: string[];
    data: Data;
}