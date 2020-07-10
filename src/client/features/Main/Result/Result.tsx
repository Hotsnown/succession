import React from 'react'
import { getSolution } from '../../../../core/getSolution'
import ResultModal from './ResultModal'
import Button from 'react-bootstrap/Button'
import { Family } from '../../../../core/devolution/entities'
import { RawTree } from '../Interface'
import { Navbar } from 'reactstrap'

export interface IResult {
    deCujus: string
    memberList: RawTree
    extractMemberList: () => void
}

const Result = ({ memberList, extractMemberList, deCujus }: IResult) => {
    const [results, setResults] = React.useState<Family>(Family.create([]))
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleToggle = () => setIsModalOpen(!isModalOpen);

    const fetchSolution = (): void => {
        extractMemberList()

        if (!isValidMemberList(memberList)) throw new Error()
        if (!isValidDeCujus(deCujus)) throw new Error()

        getSolution(memberList, deCujus)
            .then(result => {setResults(result)})
            .then(() => setIsModalOpen(true))
            .catch(err => alert(err))
      }
    
    return (
        <>
            <Navbar>
                <h5>Current De Cujus : {deCujus}</h5>
                <Button onClick = {fetchSolution}>Click me</Button>
                <ResultModal results={results} isModalOpen={isModalOpen} toggle ={handleToggle}/>
            </Navbar>
        </>
    )
}

export default Result

const isValidDeCujus = (deCujusId: string): boolean => deCujusId !== ''
const isValidMemberList = (memberList: RawTree): boolean => true