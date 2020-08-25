import React from 'react'
import { Documentation as Docu } from 'publicodes'
import { useLocation } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { engine } from '../../../../core/explain/main'

export const Documentation = () => {

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
            <Docu language={'fr'} engine={engine} documentationPath={'/documentation'} />
        </div>
    )
}

function DocumentationLanding({ rules }) {
    return (
        <>
            <h1>
                Documentation
			</h1>
            <p>Explorez toutes les règles de la documentation</p>
            <SearchBar rules={rules} showDefaultList={true} />
        </>
    )
}