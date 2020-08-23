/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import { getSolution } from '../../../../core/devolution/getSolution'
import ResultModal from './ResultModal'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Family } from '../../../../core/devolution/entities'
import { RawTree } from '../Interface'
import { Navbar } from 'reactstrap'

export interface IResult {
    deCujus: string
    memberList: RawTree
    extractMemberList: () => void
    rootId: string
}

const Result = ({ memberList, extractMemberList, deCujus, rootId }: IResult) => {
    
    const [results, setResults] = React.useState<Family>(Family.create([]))
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleToggle = () => setIsModalOpen(!isModalOpen);

    const processSolution = (): void => {
        extractMemberList()

        if (!isValidMemberList(memberList)) throw new Error()
        if (!isValidDeCujus(deCujus)) throw new Error()

        setResults(getSolution(memberList, deCujus, rootId))
        setIsModalOpen(true)
      }
    
    return (
        <>
            <Navbar>
                <h5>Current De Cujus : {deCujus}</h5>
                <ButtonGroup aria-label="Expert System Controller">
                    <Button onClick = {processSolution}>Update De Cujus</Button>
                    <Button onClick = {processSolution}>Click me</Button>
                </ButtonGroup>
                <ResultModal results={results} isModalOpen={isModalOpen} toggle ={handleToggle}/>
            </Navbar>
        </>
    )
}

export default Result

const isValidDeCujus = (deCujusId: string): boolean => deCujusId !== ''
const isValidMemberList = (memberList: RawTree): boolean => true // TODO : already validated by the controller