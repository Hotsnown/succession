export interface Family {
    member_id: string;
    childs: string[];
    attributes: {
        status: 'valid' | 'invalid'
    };
}

export interface Query {
    de_cujus: string;
    family: Family[];
}
