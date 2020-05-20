/**
 * @jest-environment node
 */
import { requestBuilder } from '../request-builder'

it('should return a 200 status code', async () => {
    
    const data = await requestBuilder()
    expect(data).toMatchSnapshot()
})