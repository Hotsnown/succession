
export interface Attributes {
}

export interface Family {
    member_id: string;
    childs: string[];
    attributes: Attributes;
}

export interface Query {
    de_cujus: string;
    family: Family[];
}
