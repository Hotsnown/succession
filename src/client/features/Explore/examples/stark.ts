/* prettier-ignore */
/*eslint-disable*/

import { FamilyExample } from './interface'

const stark: FamilyExample = {
    rickard: {
        id: "rickard",
        name: "Rickard Stark",
        partners: ['lyarra'],
        children: {lyarra : ['benjen', 'brandon', 'lyanna', 'eddard']},
        status: 'invalid',
    },
    lyarra: {
        id: 'lyarra',
        name: 'Lyarra Stark',
        status: 'invalid'
    },
    benjen: {
        id: 'benjen',
        name: 'Benjen Stark',
        status: 'invalid',
    },
    brandon: {
        id: 'brandon',
        name: 'Brandon Stark',
        status: 'invalid',
    },
    lyanna: {
        id: 'lyanna',
        name: 'Lyanna Stark',
        status: 'invalid',
    },
    eddard: {
        id: 'eddard',
        name: 'Eddard (Ned) Stark',
        partners: ['catelyn'],
        children: { catelyn: ['bran', 'arya', 'rickon', 'robb', 'sansa']},
        status: 'invalid',
    },
    catelyn: {
        id: 'catelyn',
        name: 'Catelyn Stark',
        status: 'invalid'
    },
    bran: {
        id: 'bran',
        name: 'Bran Stark',
        status: 'valid',
    },
    arya: {
        id: 'arya',
        name: 'Arya Stark',
        status: 'valid',
    },
    rickon: {
        id: 'rickon',
        name: 'Rickon Stark',
        status: 'invalid',
    },
    robb: {
        id: 'robb',
        name: 'Robb Stark',
        status: 'invalid',
    },
    sansa: {
        id: 'sansa',
        name: 'Sansa Stark',
        status: 'valid',
    },
}

export default stark