export class Output {
    de_cujus: string
    family: Family[]

    constructor(de_cujus: string){
        this.de_cujus = de_cujus
        this.family = []
    }

    jsonify() {
        return JSON.stringify(
            {
                de_cujus: this.de_cujus, 
                family: this.family
            })
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