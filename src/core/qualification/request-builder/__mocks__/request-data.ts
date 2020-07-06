import { Query } from '../interface'

export const requestattributes: Query = {"de_cujus":"Pierre","family":[
    {
        "member_id":"Pierre",
        "childs":[],
        "attributes":{"status": 'valid'}
    },
    {"member_id":"Marie","childs":[],"attributes":{"status": 'valid'}},
    {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"status": 'valid'}},
    {"member_id":"Bea","childs":["Armand","Morgane","Thibault","Romain"],"attributes":{"status": 'valid'}},
    {"member_id":"Armand","childs":[],"attributes":{"status": 'valid'}},
    {"member_id":"Morgane","childs":[],"attributes":{"status": 'valid'}},
    {"member_id":"Thibault","childs":[],"attributes":{"status": 'valid'}},
    {"member_id":"Romain","childs":[],"attributes":{"status": 'valid'}},
    {"member_id":"Sylvain","childs":[],"attributes":{"status": 'valid'}},
    {"member_id":"Steph","childs":[],"attributes":{"status": 'valid'}},
    {"member_id":"Bernard","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"status": 'valid'}},
    {"member_id":"Claudine","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"status": 'valid'}}]}