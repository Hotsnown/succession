/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import { Tree } from './Tree/Tree'
import Container from 'react-bootstrap/Container'
import { getSolution } from './../../../core/devolution/getSolution'
import ResultModal from './Result'
import { RawTree } from './Interface'
import { Navbar } from 'reactstrap'
import { FamilyDTO } from './Interface'
import { RouteComponentProps } from 'react-router-dom'

export const App = (props: RouteComponentProps) => {

    //const { root, family } = getInitialDataFromUrl()

    const root = "deCujus"
    const family = null
    const [memberList, setMemberList] = React.useState<any>({})
    const [deCujus, setDeCujus] = React.useState<string>('deCujus')
    const [results, setResults] = React.useState<FamilyDTO>({ members: [] })
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const onUpdateMemberList = (memberList: any) => setMemberList(memberList)
    const handleUpdateDeCujus = (value: string) => setDeCujus(value)
    const handleToggle = () => setIsModalOpen(!isModalOpen);

    const processSolution = (): void => {

        console.log(memberList)
        
        if (!isValidMemberList(memberList)) throw new Error()
        if (!isValidDeCujus(deCujus)) throw new Error()

        setResults(getSolution(memberList, deCujus, root))
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="content">
                <Container fluid>
                    <Tree 
                        {...props}
                        onUpdateMemberList={onUpdateMemberList}
                        onUpdateDeCujus={handleUpdateDeCujus}
                        deCujus={deCujus}
                        processSolution={processSolution}
                    ></Tree>
                    <ResultModal results={results} isModalOpen={isModalOpen} toggle={handleToggle} />
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
    const paramsString = url.search
    const searchParams = new URLSearchParams(paramsString)
    const root = searchParams.get('root')
    const family = searchParams.get('family')
    if (!root) {
        //throw new Error(`${root} is not a valid root`)
    }
    if (!family) {
        //throw new Error(`${family} is not a valid family`)
    }
    return { root, family }
}
