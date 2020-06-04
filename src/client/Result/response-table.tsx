import React from 'react'
import { DevolutionPresenter } from '../../core/devolution/devolutionPresenter'
import { Solution } from '../../core/devolution/entities/Solution'

const ResponseParser = (props: any) => {
    const { results } = props
    const devolution = new DevolutionPresenter()
    return (
        <>
            <ul>{results.map((r: any) =>
                <li key={Math.random()}>{r.member_id} degré: {r.data.degre}, ordre: {r.data.ordre}</li>)}
            </ul>
            <ul>
                {devolution
                    .getDevolution(results)
                    .filter((r: Solution) => r.legalRights.value !== 0)
                    .map((r: Solution) =>
                        <li key={Math.random()}>{r.member_id} legalRights: {r.legalRights}</li>)}
            </ul>
        </>
    )
}

export default ResponseParser