import React from 'react'
import { Tree } from './Tree/Tree'
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
    return (
        <Tree 
            {...props}
            onUpdateMemberList={props.onUpdateMemberList}
            onUpdateDeCujus={props.handleUpdateDeCujus}
            deCujus={props.deCujus}
            processSolution={props.processSolution}
        ></Tree>
    )
}