/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import Tree from './Tree/Tree'
import initialTreeValue from './initialTreeValue'
import Container from 'react-bootstrap/Container'
import { getSolution } from './../../../core/devolution/getSolution'
import ResultModal from './Result'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { RawTree } from './Interface'
import { Navbar } from 'reactstrap'
import { FamilyDTO } from './Interface'

export const App = () => {

    const { root, family } = getInitialDataFromUrl()

    const [memberList, setMemberList] = React.useState<any>({})
    const [deCujus, setDeCujus] = React.useState<string>('deCujus')
    const [results, setResults] = React.useState<FamilyDTO>({ members: [] })
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const onUpdateMemberList = (memberList: any) => setMemberList(memberList)
    const handleUpdateDeCujus = (value: string) => setDeCujus(value)
    const handleToggle = () => setIsModalOpen(!isModalOpen);

    const processSolution = (): void => {
        
        if (!isValidMemberList(memberList)) throw new Error()
        if (!isValidDeCujus(deCujus)) throw new Error()

        setResults(getSolution(memberList, deCujus, root))
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="content">
                <Container fluid>
                    <Navbar>
                        <h5>Current De Cujus : {deCujus}</h5>
                        <ButtonGroup aria-label="Expert System Controller">
                            <Button onClick={processSolution}>Update De Cujus</Button>
                            <Button onClick={processSolution}>Click me</Button>
                        </ButtonGroup>
                        <ResultModal results={results} isModalOpen={isModalOpen} toggle={handleToggle} />
                    </Navbar>
                    <Tree
                        root={root}
                        datalist={JSON.parse(family) || JSON.parse(JSON.stringify(initialTreeValue))}
                        onUpdateDeCujus={handleUpdateDeCujus}
                        onUpdateMemberList={onUpdateMemberList} />
                </Container>
            </div>
        </>
    )
}

export default App

const isValidDeCujus = (deCujusId: string): boolean => deCujusId !== ''
const isValidMemberList = (memberList: RawTree): boolean => true // TODO : already validated by the controller

function getInitialDataFromUrl() {
    const url = new URL(window.location.href)
    var paramsString = url.search
    var searchParams = new URLSearchParams(paramsString)
    const root = searchParams.get('root')
    const family = searchParams.get('family')
    if (!root) {
        throw new Error(`${root} is not a valid root`)
    }
    if (!family) {
        throw new Error(`${family} is not a valid family`)
    }
    return { root, family }
}
