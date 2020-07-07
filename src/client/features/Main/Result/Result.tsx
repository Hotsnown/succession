import React from 'react'
import { getSolution } from '../../../../core/getSolution'
import ResponseParser from './Result-Modal'
import Button from 'react-bootstrap/Button'
import { Family } from '../../../../core/devolution/entities'
import DeCujusForm from './DeCujusForm'
import { RawTree } from '../Interface'

export interface IResult {
    memberList: RawTree
    extractMemberList: () => void
}

const Result = ({ memberList, extractMemberList }: IResult) => {
    const [results, setResults] = React.useState<Family>(Family.create([]))
    const [deCujus, setDecujus] = React.useState<string>('deCujus')
    const [displayResult, setDisplayResult] = React.useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: string) => {
        setDecujus(value)
        event.preventDefault();
    }
    
    React.useEffect(() => {

        if(displayResult) {
            
            if (!isValidMemberList(memberList)) throw new Error()
            if (!isValidDeCujus(deCujus)) throw new Error()

            getSolution(memberList, deCujus)
                .then(result => {setResults(result)})
                .catch(err => alert(err))
        }

      }, [displayResult]);

    if (displayResult) {
        return (
            <>
                <Button onClick = {() => {extractMemberList(); setDisplayResult(true)}}>Click me</Button>
                <ResponseParser results= {results}/>
            </>)
    }
    
    return (
        <>
            <DeCujusForm handleSubmit={handleSubmit} />
            <h5>Current De Cujus : {deCujus}</h5>
            <Button onClick = {() => {extractMemberList(); setDisplayResult(true)}}>Click me</Button>
        </>
    )
}

export default Result

const isValidDeCujus = (deCujusId: string): boolean => deCujusId !== ''
const isValidMemberList = (memberList: RawTree): boolean => true