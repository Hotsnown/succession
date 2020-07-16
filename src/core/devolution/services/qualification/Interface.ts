import { MemberConstructor }from '../../entities'

export interface MemberWithIndex extends MemberConstructor {
    index: number
}

export interface Query {
    de_cujus: string;
    family: MemberWithIndex[];
}