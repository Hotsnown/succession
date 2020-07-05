import React from 'react'
import { getSolution } from '../../../../core/getSolution'
import ResponseParser from './Result-Modal'
import Button from 'react-bootstrap/Button'
import { Family, Member } from '../../../../core/devolution/entities'

export interface IResult {
    memberList: Member[]
    extractMemberList: () => void
    deCujus: string
}

const Result = ({ memberList, extractMemberList, deCujus }: IResult) => {
    const [results, setResults] = React.useState<Family>(Family.create([]))
    const [displayResult, setDisplayResult] = React.useState(false)

    React.useEffect(() => {
        getSolution(memberList, deCujus)
        .then(result => {setResults(result)})
        .catch(err => alert(err))
      }, [displayResult]);

    if (displayResult) {
        
        return (
            <>
                <Button onClick = {() => {extractMemberList(); setDisplayResult(true)}}>Click me</Button>
                <ResponseParser results= {results}/>
            </>)
    }
    return (
        <Button onClick = {() => {extractMemberList(); setDisplayResult(true)}}>Click me</Button>
    )
}

export default Result