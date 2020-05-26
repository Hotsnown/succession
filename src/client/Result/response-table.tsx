import React from 'react'
import { repartitionParTête } from '../../core/response/index'
import { Solution } from '../../core/response/IResponse'

const ResponseParser = (props: any) => {
    const { results } = props
    return (
        <>
            <ul>{results.map((r: any) =>
                <li key={Math.random()}>{r.member_id} degré: {r.data.degre}, ordre: {r.data.ordre}</li>)}
            </ul>
            <ul>
                {repartitionParTête(results)
                    .filter((r: Solution) => r.legalRights !== 0)
                    .map((r: Solution) =>
                        <li key={Math.random()}>{r.member_id} legalRights: {r.legalRights}</li>)}
            </ul>
        </>
    )
}

export default ResponseParser