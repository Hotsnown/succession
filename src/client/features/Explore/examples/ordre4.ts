import { FamilyExample } from './interface'

const ordre4: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
        status: 'invalid'
    },
    father: {
        id: "father",
        name: "father",
        partners: ["mother"],
        children: { mother: ["deCujus"]},
        status: 'invalid'
    },
    mother: {
        id: "mother",
        name: "mother",
        status: 'invalid'
    },
    paternal_grand_father: {
        id: "paternal_grand_father",
        name: "paternal_grand_father",
        partners: ["paternal_grand_mother"],
        children: { paternal_grand_mother: ["father", "uncle"]},
        status: 'invalid'
    },
    paternal_grand_mother: {
        id: "paternal_grand_mother",
        name: "paternal_grand_mother",
        status: 'invalid'
    },
    uncle: {
        id: "uncle",
        name: "uncle",
        partners: ["uncleSpouse"],
        children: { uncleSpouse: ["cousin"]},
        status: "valid"
    },
    uncleSpouse: {
        id: "uncleSpouse",
        name: "uncleSpouse",
        status: "valid"
    },
    cousin: {
        id: "cousin",
        name: "cousin",
        partners: ["cousinSpouse"],
        children: { cousinSpouse: ["grandCousin"]},
        status: "valid"
    },
    cousinSpouse: {
        id: "cousinSpouse",
        name: "cousinSpouse",
        status: "valid"
    },
    grandCousin: {
        id: "grandCousin",
        name: "grandCousin",
        status: "valid",
    }
}

export default ordre4