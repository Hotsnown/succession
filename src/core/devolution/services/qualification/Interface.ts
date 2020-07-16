import { Member }from '../../entities'

export interface MemberWithIndex extends Member {
    index: number
}

export interface Query {
    de_cujus: string;
    family: MemberWithIndex[];
}