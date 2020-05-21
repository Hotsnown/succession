import treeParser from '../tree-parser'
import { simpsonsTree } from '../__mocks__/data'
const target = require ('../__mocks__/simpson.target.json')

it (' should return empty childs when there is no childs', () => {
    const mock = {
        abe: {
            id: "abe",
            name: "Abraham J. (Grandpa) Simpson",
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

it('should work with lisa', () => {
    const mock = {
        lisa: {
            id:"lisa",
            name: "Lisa Marie Simpson",
            partners: ["millhouse"],
            children: {millhouse: ["millhouse_jr"]}
          },
    }

    const target = {
        "de_cujus": "abe",
        "family": [
            {
                "member_id": "lisa",
                "childs": ["millhouse_jr"],
                "data": {
                }
            }]
    }

    expect(treeParser(mock)).toEqual(target)

})

it('should work with whole data', () => {
    expect(simpsonsTree).toBe(target)
})