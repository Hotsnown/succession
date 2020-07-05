import { FamilyExample } from './interface'

const ordre3AvecParents: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
    },
    father: {
        id: "father",
        name: "father",
        partners: ["mother"],
        children: { mother: ["deCujus"]}
    },
    mother: {
        id: "mother",
        name: "mother",
        partners: ["father"],
        children: { father: ["deCujus"]}
    },
    paternal_grand_father: {
        id: "paternal_grand_father",
        name: "paternal_grand_father",
        partners: ["paternal_grand_mother"],
        children: { paternal_grand_mother: ["father"]}
    },
    paternal_grand_mother: {
        id: "paternal_grand_mother",
        name: "paternal_grand_mother"
    },
    maternal_grand_father: {
        id: "maternal_grand_father",
        name: "maternal_grand_father",
        partners: ["maternal_grand_mother"],
        children: { maternal_grand_mother: ["mother"]}
    },
    maternal_grand_mother: {
        id: "maternal_grand_mother",
        name: "maternal_grand_mother"
    },
}

export default ordre3AvecParents