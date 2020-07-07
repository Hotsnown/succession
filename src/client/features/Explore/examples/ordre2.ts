import { FamilyExample } from './interface'

const ordre2: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
        status: 'invalid'
    },
    father: {
        id: "father",
        name: "father",
        partners: ["mother"],
        children: { mother: ["deCujus", "sibling1", "sibling2"]},
        status: 'valid'
    },
    mother: {
        id: "mother",
        name: "mother",
        status: 'valid'
    },
    sibling1: {
        id: "sibling1",
        name: "sibling1",
        partners: ["sibling1Spouse"],
        children: { sibling1Spouse : ["nephew"]},
        status: 'valid'
    },
    sibling1Spouse: {
        id: "sibling1Spouse",
        name: "sibling1Spouse",
        status: 'valid',
    },
    nephew: {
        id: "nephew",
        name: "nephew",
        status: 'valid'
    },
    sibling2: {
        id: "sibling2",
        name: "sibling2",
        status: 'valid'
    }
}

export default ordre2