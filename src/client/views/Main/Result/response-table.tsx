import React from 'react'
import { Family } from '../../../../core/devolution/entities'

interface IProps {
    results: Family
}
const ResponseParser = ({ results }: IProps) => {
    return (
        <>
            <ul>{results.members.map((member) =>
                <li key={Math.random()}>{member.member_id} degré: {member.attributes.degre}, ordre: {member.attributes.ordre}</li>)}
            </ul>
            <ul>
                {results.members
                    .filter(member => member.attributes.legalRights !== 'unqualified')
                    .filter(member => member.attributes.legalRights !== 0)
                    .map(member => 
                    <li key={Math.random()}>{member.member_id} : {member.legalRights}</li>)}
            </ul>
        </>
    )
}

export default ResponseParser