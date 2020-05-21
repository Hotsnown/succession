import React from 'react'
import { IResult } from './interface'
import getDevolution from '../../core/index'

const Result = (props: IResult) => {
    const [results, setResults]: any[] = React.useState([])
    const [displayResult, setDisplayResult] = React.useState(false)

    
    if (displayResult) {
        const qd: any = getDevolution(props.memberList).then(result => {setResults(result.task)})
        return <ul>{results.map((r: any) => <li key={Math.random()}>{r.member_id} degré: {r.data.degre}, ordre: {r.data.ordre}</li>)}</ul>
    }
    return (
        <button onClick = {() => setDisplayResult(true)}>Click me</button>
    )
}

export default Result