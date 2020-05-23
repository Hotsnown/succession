import React from 'react'

const ResponseParser = (props: any) => {
    console.log(props.memberList)
    const { results } = props
    return (
    <ul>{results.map((r: any) =>
        <li key={Math.random()}>{r.member_id} degré: {r.data.degre}, ordre: {r.data.ordre}</li>)}
    </ul>
    )
}

export default ResponseParser