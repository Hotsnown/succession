/**
 * @jest-environment node
 */
import { getQualificationFrom } from '../request-builder'
import { requestData } from './request-data'

it('should return a 200 status code', async () => {
    
    const data = await getQualificationFrom(requestData)
    expect(data).toMatchSnapshot()
})