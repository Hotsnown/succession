import React from 'react'
import Tree from './Tree/Tree'
import initialTreeValue from './initialTreeValue'

export const App = () => {

    return <Tree
        root='abe'
        datalist={JSON.parse(JSON.stringify(initialTreeValue))} />
}

export default App