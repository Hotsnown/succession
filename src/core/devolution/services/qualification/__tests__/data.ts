import { Query } from '../Interface'

export const data: Query = {
    "de_cujus":"Pierre",
    "family":[
        {"member_id":"Pierre","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 0},
        {"member_id":"Marie","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 1},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 2},
        {"member_id":"Bea","childs":["Armand","Morgane","Thibault","Romain"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 3},
        {"member_id":"Armand","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 4},
        {"member_id":"Morgane","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 5},
        {"member_id":"Thibault","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 6},
        {"member_id":"Romain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 7},
        {"member_id":"Sylvain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 8},
        {"member_id":"Steph","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 9},
        {"member_id":"Bernard","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 10},
        {"member_id":"Claudine","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid'},"index": 11}
    ]
}

it('', () => {expect(true).toBeTruthy()})