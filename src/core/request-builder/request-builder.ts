import { requestData } from './request-data'
const fetch = require('node-fetch')

export async function requestBuilder () {

    const raw = JSON.stringify(requestData);
    
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: raw,
    };
    
    const result  = await fetch("http://127.0.0.1:5000/todo/api/v1.0/tasks", requestOptions)
      .then((response: Response) => response.json())
      .then((result: string) => {return result})
      .catch((error: Error) => console.log('error', error));

    return result
}
