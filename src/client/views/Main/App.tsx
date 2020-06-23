import React from 'react'
import Tree from './Tree/Tree'
import initialTreeValue from './initialTreeValue'
import Container from 'react-bootstrap/Container'
import Result from './Result/Result'

import 'bootstrap/dist/css/bootstrap.min.css';
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

    return (
        <>
            <Container fluid>
                <Navbar>
                    <Result extractMemberList={extractMemberList} memberList={memberList} />
                </Navbar>
                <Tree
                    root='abe'
                    datalist={JSON.parse(JSON.stringify(initialTreeValue))}
                    ref={formRef} />
            </Container>
        </>
    )
}

export default App