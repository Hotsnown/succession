/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import { FamilyDTO } from '../Interface'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Engine, { Documentation, RuleLink } from 'publicodes';
import { rules } from '../../../../core/explain/rules'
import { setSituation, Facts } from '../../../../core/explain/facts'
import { Link } from 'react-router-dom'

interface ResultProps {
    results: FamilyDTO
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
            <ul>
                {results.members
                    .filter((member) => member !== undefined &&
                                        member.attributes.legalRights !== 'unassigned' && 
                                        member.attributes.legalRights!.isNotZero())
                    .map((member, index) =>
                    <li key={index}>
                      {member.member_id} : {member.attributes.legalRights.toString()}
                      <Link onClick={() => handleExplain(member.member_id)} to={"../../documentation/droitsDePierre"}> 
                      Explain me!
                      </Link>
                    </li>)}
            </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
          <Link to={"../../documentation/droitsDePierre"}>ICI</Link>
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ResultModal