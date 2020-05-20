import { treeParser } from '../tree-parser'
import { simpsonsTree } from './data'

it('', () => {
    expect(treeParser(simpsonsTree)).toMatchSnapshot()
})