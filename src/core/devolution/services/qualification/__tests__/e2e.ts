import { MemberConstructor } from "../../../entities"

it('', () => {
    const data: MemberConstructor[] = 
    [
        {"member_id":"Pierre","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Marie","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Fred","childs":["Pierre","Marie"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bea","childs":["Armand","Morgane","Thibault","Romain"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Armand","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Morgane","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Thibault","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Romain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Sylvain","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Steph","childs":[],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Bernard","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}},
        {"member_id":"Claudine","childs":["Fred","Sylvain","Bea","Steph"],"attributes":{"degre": "unassigned", "ordre": "unassigned","status": 'valid', "branch": "unassigned", "isReprésentant": "unassigned", "isReprésenté": "unassigned", "legalRights": "unassigned", "spouse": ""}}
    ]
    expect(true).toBeTruthy()
})
