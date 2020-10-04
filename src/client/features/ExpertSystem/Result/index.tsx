/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import { FamilyResultDTO } from '../Interface'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Facts } from '../../../../core/explain/facts'
import { Link } from 'react-router-dom'

interface ResultProps {
    results: FamilyResultDTO
    isModalOpen: boolean
    facts: Facts
    toggle: () => void
    handleExplain: (memberId: string) => void
}

const ResultModal = ({ results, isModalOpen, toggle, handleExplain }: ResultProps) => {
  
  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Results</ModalHeader>
        <ModalBody>
            <ListGroup flush>
                {results.members
                    .filter((member) => member !== undefined &&
                                        member.attributes.legalRights !== 'unassigned' && 
                                        member.attributes.legalRights!.isNotZero())
                    .map((member, index) =>
                    <ListGroupItem key={index}>
                      {member.member_id.toUpperCase()} : {member.attributes.legalRights.toString()}{' '}
                      <Link onClick={() => handleExplain(member.member_id)} to={"../../documentation/droitsDePierre"}> 
                        <Badge className="float-right">Explain this!</Badge>
                      </Link>
                    </ListGroupItem>)}
            </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
          <Link style={{color: "white"}} to={"../../succession/documentation"}>Documentation</Link>
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ResultModal