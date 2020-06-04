
export interface Data {
}

export interface Family {
    member_id: string;
    childs: string[];
    data: Data;
}

export interface Query {
    de_cujus: string;
    family: Family[];
}
