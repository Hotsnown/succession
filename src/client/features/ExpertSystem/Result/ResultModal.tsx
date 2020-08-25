/* prettier-ignore */
/*eslint-disable*/

import React from 'react'
import { FamilyDTO } from '../Interface'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MesDépenses } from '../Explain/devolution'

interface IProps {
    results: FamilyDTO
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
                    .filter((member) => member !== undefined)
                    .filter((member) => member.attributes.legalRights !== 'unassigned')
                    .filter((member) => member.attributes.legalRights!.isNotZero())
                    .map((member, index) =>
                    <li key={index}>{member.member_id} : {member.attributes.legalRights.toString()}</li>)}
            </ul>
            <MesDépenses/>
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