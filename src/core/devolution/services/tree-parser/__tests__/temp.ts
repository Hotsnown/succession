import { bfs } from '../temp'
import dataTree from '../__mocks__/data'

it('', () => {
    var flattenedCollection: any = {};
    bfs(dataTree, "children", flattenedCollection);
    console.log(flattenedCollection);
    expect(true).toBeTruthy()
})
