import { FamilyExample } from './interface'

const ordre2AvecParentsSansReprésentation: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
    },
    father: {
        id: "father",
        name: "father",
        partners: ["mother"],
        children: { mother: ["deCujus", "sibling1", "sibling2"]}
    },
    mother: {
        id: "mother",
        name: "mother",
    },
    sibling1: {
        id: "sibling1",
        name: "sibling1",
        partners: ["sibling1Spouse"],
        children: { sibling1Spouse : ["nephew"]}
    },
    nephew: {
        id: "nephew",
        name: "nephew",
    },
    sibling2: {
        id: "sibling2",
        name: "sibling2"
    }

}

export default ordre2AvecParentsSansReprésentation