/* prettier-ignore */
/*eslint-disable*/

import { FamilyExample } from './interface'

//src: https://www.google.com/search?q=god+greek+genealogy&sxsrf=ALeKk027F_-N2TmjJngpl_0G_k5lR5U-LA:1594669185927&tbm=isch&source=iu&ictx=1&fir=Q6l_gRNPBLYq0M%252C59J1Je4QdKQJQM%252C_&vet=1&usg=AI4_-kSGyNx_g9jdD5-Obicg1XOr2f6V7w&sa=X&ved=2ahUKEwjq2fHS_crqAhUQrxoKHWUmBWMQ9QEwD3oECAkQHg&biw=1912&bih=883#imgrc=Q6l_gRNPBLYq0M

const greekgods: FamilyExample = {
    chaos: {
        id: 'chaos',
        name: 'Chaos',
        partners: ['nyx'],
        children: {nyx: ['erebus']},
        status: 'invalid',
    },
    nyx: {
        id: 'nyx',
        name: 'Nyx',
        status: 'invalid',
    },
    erebus: {
        id: 'erebus',
        name: 'Erebus',
        partners: ['nyx'],
        children: {nyx: ['aether', 'hemera']},
        status: 'invalid'
    },
    aether: {
        id: 'aether',
        name: 'Aether',
        partners: ['hemera'],
        children: {hemera: ['gaia', 'tartarus', 'eros', 'pontus']},
        status: 'invalid',
    },
    hemera: {
        id: 'hemera',
        name: 'Hemera',
        status: 'invalid',
    },
    gaia: {
        id: 'gaia',
        name: 'Gaia',
        status: 'invalid',
        partners: ['uranus'],
        children: {uranus: ['oceanus', 'mnemosyne', 'chronus', 'themis', 'coeus', 'hyperion', 'iapetus']}
    },
    tartarus: {
        id: 'tartarus',
        name: 'Tartarus',
        status: 'invalid',
    },
    eros: {
        id: 'eros',
        name: 'Eros',
        status: 'invalid',
    },
    pontus: {
        id: 'pontus',
        name: 'Pontus',
        status: 'invalid',
    },
    oceanus: {
        id: 'oceanus',
        name: 'Oceanus',
        status: 'invalid',
    },
    mnemosyne: {
        id: 'hemera',
        name: 'Hemera',
        status: 'invalid',
    },
    chronus: {
        id: 'chronus',
        name: 'Chronus',
        status: 'invalid',
        partners: ['rhea'],
        children: {rhea: ['hestia', 'hades', 'poseidon', 'zeus']}
    },
    themis: {
        id: 'hemera',
        name: 'Hemera',
        status: 'invalid',
    },
    coeus: {
        id: 'hemera',
        name: 'Hemera',
        status: 'invalid',
        partners: ['phoebe'],
        children: {phoebe: ['leto']}
    },
    hyperion: {
        id: 'hyperion',
        name: 'Hyperion',
        status: 'invalid',
    },
    iapetus: {
        id: 'iapetus',
        name: 'Iapetus',
        status: 'invalid',
        partners: ['clymene'],
        children: {clymene: ['atlas', 'epimetheus']}
    },
    hestia: {
        id: 'hestia',
        name: 'Hestia',
        status: 'invalid',
    },
    hades: {
        id: 'hades',
        name: 'Hades',
        status: 'invalid',
    },
    poseidon: {
        id: 'poseidon',
        name: 'Poseidon',
        status: 'invalid',
    },
    zeus: {
        id: 'zeus',
        name: 'zeus',
        status: 'invalid',
        partners: ['hera', 'semele'],
        children: {hera: ['athena', 'ares', 'hebe', 'hephaistos'], semele: ['dionysus'], demeter: ['persephone'], maia: ['hermes'], dione: ['aphrodite']}
    },
}

export default greekgods