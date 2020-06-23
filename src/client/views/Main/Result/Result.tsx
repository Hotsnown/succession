import React from 'react'
import { getSolution } from '../../../../core/getSolution'
import ResponseParser from './response-table'
import Button from 'react-bootstrap/Button'
import { Family, Member } from '../../../../core/devolution/entities'

export interface IResult {
    memberList: Member[]
    extractMemberList: () => void
}

const Result = ({ memberList, extractMemberList }: IResult) => {
    const [results, setResults] = React.useState<Family>(Family.create([]))
    const [displayResult, setDisplayResult] = React.useState(false)

    React.useEffect(() => {
        getSolution(memberList, 'abe')
        .then(result => {setResults(result)})
        .catch(err => console.error(err))
      }, [displayResult]);

    if (displayResult) {
        return <ResponseParser results= {results}/>
    }
    return (
        <Button onClick = {() => {extractMemberList(); setDisplayResult(true)}}>Click me</Button>
    )
}

export default Result