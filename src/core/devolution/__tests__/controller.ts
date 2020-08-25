import { getSolution } from "../getSolution"
import { input } from './mocks'

it('should create a valid family', () => {
    const solution = getSolution(input, 'abe', 'abe')
    expect(solution.deCujus.member_id).toStrictEqual('abe')
    expect(solution.deCujus.attributes.degre).toStrictEqual(0)
    expect(solution.deCujus.attributes.ordre).toStrictEqual(0)
    //expect(solution.root.member_id).toStrictEqual('abe')
})