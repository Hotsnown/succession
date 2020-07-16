import React from 'react'
import { Family } from '../../../../core/devolution/entities'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface IProps {
    results: Family
    isModalOpen: boolean
    toggle: () => void
}

const ResultModal = ({ results, isModalOpen, toggle }: IProps) => {
  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Results</ModalHeader>
        <ModalBody>
            <ul>
                {results.members
                    .filter((member) => member.attributes.legalRights !== 'unassigned')
                    //@ts-ignore
                    .filter((member) => member.attributes.legalRights.isNotZero())
                    .map((member, index) =>
                    <li key={index}>{member.member_id} : {member.attributes.legalRights.toString()}</li>)}
            </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Explain me!</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ResultModal