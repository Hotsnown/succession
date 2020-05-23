import React from 'react'
import { IResult } from './interface'
import getDevolution from '../../core/index'
import ResponseParser from './response-parser'

const Result = (props: IResult) => {
    const [results, setResults]: any[] = React.useState([])
    const [displayResult, setDisplayResult] = React.useState(false)

    const memberList = props.memberList

    console.log(memberList)

    //@ts-ignore
    React.useEffect(() => {
        getDevolution(memberList)
        .then(result => {setResults(result.task)})
        .catch(err => console.error(err))
      }, [displayResult, memberList]);

    if (displayResult) {
        return <ResponseParser results= {results}/>
    }
    return (
        <button onClick = {() => setDisplayResult(true)}>Click me</button>
    )
}

export default Result