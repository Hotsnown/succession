import Engine, { RuleLink as EngineRuleLink } from 'publicodes'
import React from 'react'
import { Link } from 'react-router-dom'
import { rules } from '../../../../core/explain/rules'
import { Facts } from '../../../../core/explain/facts'

type DottedName = any

export default function RuleLink(
	props: {
		dottedName: DottedName
		displayIcon?: boolean
	} & Omit<React.ComponentProps<Link>, 'to'>
) {
	const engine = new Engine(rules)

    const facts:Facts = {
        "nombreDeMembresDuDegreSuccessible" : 5,
        "nombreDeMembresDeLordreFictif" : 2,
        "estRepresentant": "non",
        "nombreDeParents": 2,
        "nombreDeBranches": 2,
        "estParent": "non",
        "ordre1Applicable": "oui",
        "ordre2Applicable": "non",
        "ordre3Applicable": "non",
        "ordre4Applicable": "non",
        "estEpoux": "non",
        "epouxExiste": "non",
        "descendantExiste": "oui",
        "estDescendant": "non"
	}
	
	return (
		<EngineRuleLink
			{...props}
			engine={engine.setSituation({...facts})}
			documentationPath={'./documentation'}
		/>
	)
}