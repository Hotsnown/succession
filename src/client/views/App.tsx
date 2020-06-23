import React from 'react'
import Tree from './Tree/Tree'
import initialTreeValue from '../initialTreeValue'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from '../Header'
import Result from './Result/Result'

import 'bootstrap/dist/css/bootstrap.min.css';

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
                <Row>
                    <Col xs={9}>
                        <Tree
                            root='abe'
                            datalist={JSON.parse(JSON.stringify(initialTreeValue))}
                            ref={formRef} />
                    </Col>
                    <Col className="p-3 mb-2 bg-light text-dark">
                        <Result extractMemberList={extractMemberList} memberList={memberList} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default App