import React from 'react'
import Engine, { Documentation as Docu } from 'publicodes'
import { useLocation } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { rules } from '../../../core/explain/rules'
import { Facts } from '../../../core/explain/facts'

interface Props {
    facts: Facts
}

export const Documentation = ({ facts }: Props) => {

    const engine = new Engine(rules).setSituation({ ...facts })

    const { pathname } = useLocation()

    if (pathname === '/succession/documentation') {
        return (
            <div className='content'>
                <DocumentationLanding rules={engine.getParsedRules()} />
            </div>
        )
    }

    return (
        <div className='content'>
            <Docu
                language={'fr'}
                engine={engine}
                documentationPath={'/documentation'}
            />
        </div>

    )
}

function DocumentationLanding({ rules }) {
    return (
        <>
            <h1>Documentation</h1>
            <p>Explorez toutes les règles de la documentation</p>
            <SearchBar rules={rules} showDefaultList={true} />
        </>
    )
}