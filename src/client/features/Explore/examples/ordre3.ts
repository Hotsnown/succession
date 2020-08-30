/* prettier-ignore */
/*eslint-disable*/

import { FamilyExample } from './interface'

const ordre3: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
        status: 'valid'
    },
    father: {
        id: "father",
        name: "father",
        partners: ["mother"],
        children: { mother: ["deCujus"]},
        status: 'valid'
    },
    mother: {
        id: "mother",
        name: "mother",
        partners: ["father"],
        children: { father: ["deCujus"]},
        status: 'valid'
    },
    paternal_grand_father: {
        id: "paternal_grand_father",
        name: "paternal_grand_father",
        partners: ["paternal_grand_mother"],
        children: { paternal_grand_mother: ["father"]},
        status: 'valid'
    },
    paternal_grand_mother: {
        id: "paternal_grand_mother",
        name: "paternal_grand_mother",
        status: 'valid'
    },
    maternal_grand_father: {
        id: "maternal_grand_father",
        name: "maternal_grand_father",
        partners: ["maternal_grand_mother"],
        children: { maternal_grand_mother: ["mother"]},
        status: 'valid'
    },
    maternal_grand_mother: {
        id: "maternal_grand_mother",
        name: "maternal_grand_mother",
        status: 'valid'
    },
    maternal_grand_grand_father: {
        id: "maternal_grand_grand_father",
        name: "maternal_grand_grand_father",
        partners: ["maternal_grand_grand_mother"],
        children: { maternal_grand_grand_mother: ["maternal_grand_father"]},
        status: 'valid'
    },
    maternal_grand_grand_mother: {
        id: "maternal_grand_grand_mother",
        name: "maternal_grand_grand_mother",
        status: 'valid'
    },
}

export default ordre3