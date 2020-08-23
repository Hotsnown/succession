import { RuleLink } from 'publicodes'
import { engine } from  '../../../../core/explain/main'
import React from 'react'

export function MesDépenses() {
	return (
		<p>
			Accéder aux{' '}
			<RuleLink
				dottedName={'droits de pierre'}
				engine={engine}
				documentationPath={'/documentation'}
			/>
		</p>
	)
}