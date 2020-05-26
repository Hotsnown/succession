export interface Data {
    degre: number;
    ordre: number;
}

export interface QualifiedFact {
    childs: string[];
    data: Data;
    member_id: string;
}

export interface Solution extends QualifiedFact {
    legalRights: number
}

export enum Status {
    Deceased,
    Indigne,
    Renonçant
}

export enum Ordres {
    Ordre1 = 1, 
    Ordre2,
    Ordre3,
    Ordre4
}

export enum Degrees {
    Degree1 = 1,
    Degree2 = 2,
    Degree3 = 3,
    Degree4 = 4,
    Degree5 = 5,
    Degree6 = 6
}