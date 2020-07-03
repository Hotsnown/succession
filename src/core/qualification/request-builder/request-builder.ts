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
      .catch(() => alert('Server has not been found. Please set it up with "npm run python".'))
    ;

    return result
}

export default getQualificationFrom