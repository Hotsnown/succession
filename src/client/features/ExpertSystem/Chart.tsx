import React from 'react'

import Tree from './Tree/Tree'
import { App } from './Tree2/App'
import initialTreeValue from './initialTreeValue'
import { RouteComponentProps } from 'react-router-dom'

interface ChartProps {
    renderTree: boolean;
    root: string;
    family: string;
    handleUpdateDeCujus: (value: string) => void;
    onUpdateMemberList: (memberList: any) => void
    deCujus: string
    processSolution: () => void
}

export const Chart = (props: ChartProps & RouteComponentProps) => {
    if (props.renderTree) {
        return (
            <Tree
                root={props.root}
                datalist={JSON.parse(props.family) || JSON.parse(JSON.stringify(initialTreeValue))}
                onUpdateDeCujus={props.handleUpdateDeCujus}
                onUpdateMemberList={props.onUpdateMemberList} />
        )
    } else {
        return (
            <App 
                {...props}
                onUpdateMemberList={props.onUpdateMemberList}
                onUpdateDeCujus={props.handleUpdateDeCujus}
                deCujus={props.deCujus}
                processSolution={props.processSolution}
            ></App>
        )
    }
}