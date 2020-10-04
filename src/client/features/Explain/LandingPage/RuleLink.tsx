import Engine, { RuleLink as EngineRuleLink } from 'publicodes'
import React from 'react'
import { Link } from 'react-router-dom'
import rules from '../../../../core/explain/rules'

type DottedName = any

export default function RuleLink(
	props: {
		dottedName: DottedName
		displayIcon?: boolean
	} & Omit<React.ComponentProps<Link>, 'to'>
) {
    const engine = new Engine(rules)
    	
	return (
		<EngineRuleLink
			{...props}
			engine={engine}
			documentationPath={'./documentation'}
		/>
	)
}