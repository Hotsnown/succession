import { RuleLink as EngineRuleLink } from 'publicodes'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { engine } from '../../../../core/explain/main'

type DottedName = any

export default function RuleLink(
	props: {
		dottedName: DottedName
		displayIcon?: boolean
	} & Omit<React.ComponentProps<Link>, 'to'>
) {
	return (
		<EngineRuleLink
			{...props}
			engine={engine}
			documentationPath={'./documentation'}
		/>
	)
}