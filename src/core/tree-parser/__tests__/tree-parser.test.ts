import treeParser from '../tree-parser'
import simpsonsTree from '../__mocks__/data'
const target = require('../__mocks__/simpson.target.json')


/* LES DONNEES DE TESTS SONT FAUSSES
 */

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

    expect(treeParser(mock, 'abe')).toEqual(target)
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
    expect(treeParser(mock, 'abe')).toEqual(target)
})

it('should not append children to a partner ', () => {
    const mock = {
        homer: {
            id:"homer",
            name: "Homer Jay Simpson",
            partners: ["marge"],
            children: {marge: ["bart", "lisa", "maggie"]}
          },
          marge: {id:"marge", name: "Marjorie (Marge) Simpson (née Bouvier)"},
          bart: {id:"bart", name: "Bartholomew (Bart) JoJo Simpson"},
          lisa: {
            id:"lisa",
            name: "Lisa Marie Simpson",
          },
          maggie: {id:"maggie", name: "Margaret (Maggie) Eve Simpson"}
    }

    const target = {
        "de_cujus": "abe",
        "family": [
            {
                "member_id" : "homer",
                "childs" : ["bart", "lisa", "maggie"],
                "data": {
                }
            },
            {
                "member_id" : "marge",
                "childs" : [],
                "data": {
                }
            },
            {
                "member_id" : "bart",
                "childs" : [],
                "data": {
                }
            },
            {
                "member_id" : "lisa",
                "childs" : [],
                "data": {
                }
            },
            {
                "member_id" : "maggie",
                "childs" : [],
                "data": {
                }
            }]
    }
    expect(treeParser(mock, 'abe')).toEqual(target)
})
it('should test an integration test', () => {
    expect(treeParser(simpsonsTree, 'homer')).toEqual(target)
})