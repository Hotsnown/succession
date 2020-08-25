import { RuleLink } from 'publicodes'
import { engine } from  '../../../../core/explain/main'
import React from 'react'

export function MesDépenses() {
	return (
		<p>
			Accéder aux{' '}
			<RuleLink
				dottedName={'ordre1'}
				engine={engine}
				documentationPath={'/documentation'}
			/>
		</p>
	)
}