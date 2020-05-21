import treeParser from '../tree-parser'
import { simpsonsTree } from './data'
const target = require('./simpson.target.json')

it('', () => {
    expect(treeParser(simpsonsTree)).toStrictEqual(target)
})