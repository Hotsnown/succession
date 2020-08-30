import { Status, Family, MemberConstructor } from '../../../entities'

it('should find the parents of a member', () => {
    const secondOrdreMembers: MemberConstructor[] = [
        {
            "childs": [],
            "attributes": {
                "degre": 0,
                "ordre": 0,
                "status": Status.Valid,
                "spouse": [''],
                "legalRights": "unassigned",
                "branch": "unassigned",
                "isReprésentant": "unassigned",
                "isReprésenté": "unassigned",
            },
            "member_id": "maggie"
        },
        {
            "childs": [
                "bart",
                "lisa",
                "maggie"
            ],
            "attributes": {
                "degre": 1,
                "ordre": 2,
                "status": Status.Valid,
                "spouse": [''],
                "legalRights": "unassigned",
                "branch": "unassigned",
                "isReprésentant": "unassigned",
                "isReprésenté": "unassigned",
            },
            "member_id": "homer"
        }
    ]

    const family = Family.create(secondOrdreMembers, 'homer')

    expect(
        family.findParentsOf('maggie')
        .find(member => member.member_id === 'homer'))
        .toBeTruthy()
})