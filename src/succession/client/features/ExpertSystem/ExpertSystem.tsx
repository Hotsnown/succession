/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import Tree from './Tree/Tree'
import initialTreeValue from './initialTreeValue'
import Container from 'react-bootstrap/Container'
import Result from './Result/Result'

export const App = () => {

    const [memberList, setMemberList] = React.useState<any>({})
    const [deCujus, setDeCujus] = React.useState<string>('deCujus')

    const formRef = React.createRef<Tree>();

    const extractMemberList = () => {
        const familyTree = formRef.current;
        if (familyTree) {
            setMemberList(familyTree.state.memberlist)
        }
    };

    const url = new URL(window.location.href);
    var paramsString = url.search
    var searchParams = new URLSearchParams(paramsString);

    const root = searchParams.get('root')
    const family = searchParams.get('family')

    if (!root) {
        throw new Error(`${root} is not a valid root`)
    }
    if (!family) {
        throw new Error(`${family} is not a valid family`)
    }

    const handleUpdateDeCujus = (value: string) => setDeCujus(value)

    return (
        <>
            <div className="content">
                <Container fluid>
                    <Result 
                        extractMemberList={extractMemberList} 
                        memberList={memberList}
                        deCujus={deCujus} 
                        rootId={root} />
                    <Tree
                        root={root}
                        datalist={JSON.parse(family) || JSON.parse(JSON.stringify(initialTreeValue))}
                        onUpdateDeCujus={handleUpdateDeCujus}
                        ref={formRef} />
                </Container>
            </div>
        </>
    )
}

export default App