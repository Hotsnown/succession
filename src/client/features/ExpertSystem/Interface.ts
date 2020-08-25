import { LegalRight } from "../../../core/devolution/entities";

/* prettier-ignore */
/*eslint-disable*/

export interface RawTree {
    id: string;
    name: string;
    status: Status
    partners: RawTree;
    children: RawTree
}

export interface FamilyDTO {
    members: Member[]
}

interface Member {
    member_id: string,
    attributes: {
        legalRights: LegalRight | 'unassigned'
    }
}

type Status = 'valid' | 'invalid'