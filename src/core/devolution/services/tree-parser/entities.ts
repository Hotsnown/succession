/* prettier-ignore */
/*eslint-disable*/

export class Output {
    de_cujus: string
    family: RawMember[]

    constructor(de_cujus: string){
        this.de_cujus = de_cujus
        this.family = []
    }

    appendFamily(member_id: string, childs: string[], status: 'valid' | 'invalid', spouse?: string) {
        this.family.push({
            member_id: member_id, 
            childs: childs,
            attributes: {
                status: status,
                spouse: spouse || 'without spouse'
            }})
    }
}

interface RawMember {
    member_id: string;
    childs: string[];
    attributes: Attributes;
    index?: number
}

interface Attributes {
    status: 'valid' | 'invalid'
    spouse: string | 'without spouse'
}