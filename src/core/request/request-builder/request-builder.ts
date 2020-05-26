import { Query } from './interface';
const fetch = require('node-fetch')

async function getQualificationFrom (query: Query) {

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(query)
    };
    
    const result  = await fetch("http://127.0.0.1:5000/todo/api/v1.0/tasks", requestOptions)
      .then((response: Response) => response.json())
      .then((result: string) => {return result})
      .catch((error: Error) => console.log('error', error));

    return result
}

export default getQualificationFrom