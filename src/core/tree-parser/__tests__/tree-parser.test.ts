import treeParser from '../tree-parser'

it (' should return empty childs when there is no childs', () => {
    const mock = {
        abe: {
            id: "abe",
            name: "Abraham J. (Grandpa) Simpson",
            partners: ["unknown", "mona"],
            children: { }
        }
    }

    const target = {
        "de_cujus": "abe",
        "family": [
            {
                "member_id": "abe",
                "childs": [],
                "data": {
                }
            }]
    }

    expect(treeParser(mock)).toEqual(target)
})

it('should work with childrens', () => {
    const mock = {
        abe: {
            id: "abe",
            name: "Abraham J. (Grandpa) Simpson",
            partners: ["unknown", "mona"],
            children: { unknown: ["herb"], mona: ["homer"] }
        }
    }

    const target = {
        "de_cujus": "abe",
        "family": [
            {
                "member_id": "abe",
                "childs": ["herb", "homer"],
                "data": {
                }
            }]
    }
    expect(treeParser(mock)).toEqual(target)
})