/* prettier-ignore */
/*eslint-disable*/

import { FamilyExample } from "./interface";

const conjointSurvivant: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
        partners: ['spouse'],
        children: {spouse : ['child1', 'child2']},
        status: 'valid',
    },
    spouse: {
        id: "spouse",
        name: "spouse",
        status: "valid",
    },
    child1: {
        id: "child1",
        name: "child1",
        status: "valid",
    },
    child2: {
        id: "child2",
        name: "child2",
        status: "valid",
    }
}

export default conjointSurvivant