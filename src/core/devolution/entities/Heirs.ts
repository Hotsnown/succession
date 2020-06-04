import { Degree, Ordre, Solution } from ".";

export interface Heir {
    childs: string[];
    member_id: string;
    data: {
        degre: Degree;
        ordre: Ordre;
        status: Status;
    }
}

export enum Status {
    Deceased,
    Indigne,
    Renonçant,
    Valid
}

export function findHeir(solutions: Solution[], heir: string): Solution {
    return solutions.find(member => member.member_id === heir)!
}