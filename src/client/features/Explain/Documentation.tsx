import React from 'react'
import Engine, { Documentation as Docu } from 'publicodes'
import { useLocation } from 'react-router-dom'
import rules from '../../../core/explain/rules/index' //TODO extract to DTO
import { Facts } from '../../../core/explain/facts' //TODO extract to DTO
import { DocumentationLanding } from './LandingPage/DocumentationLanding'

interface Props {
    facts: Facts
}

export const Documentation = ({ facts }: Props) => {

    const engine = new Engine(rules).setSituation({ ...facts })

    console.log(engine.evaluate('droitsDePierre'))

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