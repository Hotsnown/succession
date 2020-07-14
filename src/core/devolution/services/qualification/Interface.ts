export interface Member {
    index: number
    member_id: string
    childs: string[]
    attributes: {
        status: 'valid' | 'invalid'
        ordre: 0 | 1 | 2 | 3 | 4 | 'outsider' | 'unassigned'
        degre: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 'outsider' | 'unassigned'
    }
}

export interface Query {
    de_cujus: string;
    family: Member[];
}