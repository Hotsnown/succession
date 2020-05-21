import { Node, RootObject } from "./interface";

export class Output {
    de_cujus: string
    family: Family[]

    constructor(de_cujus: string, family: Family[]){
        this.de_cujus = de_cujus
        this.family = family
    }

    jsonify() {
        return JSON.stringify(
            {
                de_cujus: this.de_cujus, 
                family: this.family
            })
    }

    appendFamily(member_id: string, childs: string[]) {
        this.family.push(new Family(member_id, childs))
    }
}

class Family {
    member_id: string;
    childs: string[];
    data: Data;
    
    constructor (member_id: string, childs: string[]) {
        this.member_id = member_id
        this.childs = childs
        this.data = {}
    }
}

interface Data {
}