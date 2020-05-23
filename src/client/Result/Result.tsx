import React from 'react'
import { IResult } from './interface'
import getDevolution from '../../core/index'
import ResponseParser from './response-parser'
import Button from 'react-bootstrap/Button'

const Result = (props: IResult) => {
    const [results, setResults]: any[] = React.useState([])
    const [displayResult, setDisplayResult] = React.useState(false)

    const memberList = props.memberList
    const extractMemberList = props.extractMemberList

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
        <Button onChange = {() => {extractMemberList(); setDisplayResult(true)}} as="input" type="submit" value="Click me"/>
    )
}

export default Result