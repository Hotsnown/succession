/* prettier-ignore */
/*eslint-disable*/

export interface RawTree {
    id: string;
    name: string;
    status: Status
    partners: RawTree;
    children: RawTree
}

type Status = 'valid' | 'invalid'