export class Output {
    de_cujus: string
    family: Family[]

    constructor(de_cujus: string){
        this.de_cujus = de_cujus
        this.family = []
    }

    appendFamily(member_id: string, childs: string[]) {
        this.family.push({member_id: member_id, childs: childs, data: {}})
    }
}

interface Family {
    member_id: string;
    childs: string[];
    data: Data;
}

interface Data {
}