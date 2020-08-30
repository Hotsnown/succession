import React from 'react'

import Tree from './Tree/Tree'
import { Tree2 } from './Tree2'
import initialTreeValue from './initialTreeValue'

interface ChartProps {
    renderTree: boolean;
    root: string;
    family: string;
    handleUpdateDeCujus: (value: string) => void;
    onUpdateMemberList: (memberList: any) => void
}
export const Chart = (props: ChartProps) => {
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
            <Tree2></Tree2>
        )
    }
}