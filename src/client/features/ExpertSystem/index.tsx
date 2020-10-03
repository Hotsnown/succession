/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import Container from 'react-bootstrap/Container'
import { RouteComponentProps } from 'react-router-dom'

import { Tree } from './Tree/Tree'
import ResultModal from './Result'

import { RawTree, FamilyResultDTO } from './Interface'

import { getFacts } from '../../../core/explain/getFacts'
import { Facts } from '../../../core/explain/facts'
import { Family } from '../../../core/devolution/entities'
import { getSolution } from './../../../core/devolution/getSolution'

interface Props {
    onHandleSolution: (facts: Facts) => void
}

export const App = (props: RouteComponentProps & Props) => {

    const url = new URL(window.location.href)
    const root = url.searchParams.get('root')

    const [memberList, setMemberList] = React.useState<any>({})
    const [deCujus, setDeCujus] = React.useState<string>(url.searchParams.get('deCujus'))
    const [results, setResults] = React.useState<FamilyResultDTO>({ members: [] })
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [facts, setFacts] = React.useState<Facts>({} as Facts)
    const [solution, setSolution] = React.useState<Family>({} as Family)

    const onUpdateMemberList = (memberList: any) => setMemberList(memberList)
    const handleUpdateDeCujus = (value: string) => setDeCujus(value)
    const handleToggle = () => setIsModalOpen(!isModalOpen);

    const processSolution = (): void => {
        
        if (!isValidMemberList(memberList)) throw new Error()
        if (!isValidDeCujus(deCujus)) throw new Error()

        const solution = getSolution(memberList, 'deCujus', root)

        setResults(solution)
        setIsModalOpen(true)
        setSolution(solution)

    }

    const handleExplain = (memberId: string) => {
        const facts:Facts = getFacts(solution, memberId)
        console.log(facts)
        setFacts(facts)
        props.onHandleSolution(facts)
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
                    <ResultModal 
                        results={results} 
                        isModalOpen={isModalOpen} 
                        toggle={handleToggle}
                        facts={facts}
                        handleExplain={handleExplain}
                    />
                </Container>
            </div>
        </>
    )
}

export default App

const isValidDeCujus = (deCujusId: string): boolean => deCujusId !== ''
const isValidMemberList = (memberList: RawTree): boolean => true // TODO : already validated by the controller