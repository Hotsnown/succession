import React from 'react'
import Tree from './Tree/Tree'
import initialTreeValue from './initialTreeValue'
import Container from 'react-bootstrap/Container'
import Result from './Result/Result'

import { Navbar } from 'reactstrap'

export const App = () => {

    const [memberList, setMemberList] = React.useState<any>({})
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
    return (
        <>
            <div className="content">
                <Container fluid>
                    <Navbar>
                        <Result extractMemberList={extractMemberList} memberList={memberList} />
                    </Navbar>
                    <Tree
                        root={root}
                        datalist={JSON.parse(family) || JSON.parse(JSON.stringify(initialTreeValue))}
                        ref={formRef} />
                </Container>
            </div>
        </>
    )
}

export default App