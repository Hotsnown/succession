import React, { useState } from 'react'
import { Family } from '../../../../core/devolution/entities'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface IProps {
    results: Family
}

const ResponseParser = ({ results }: IProps) => {

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            <ul>{results.members.map((member) =>
                <li key={Math.random()}>{member.member_id} degré: {member.attributes.degre}, ordre: {member.attributes.ordre}</li>)}
            </ul>
            <ul>
                {results.members
                    .filter(member => member.attributes.legalRights !== 'unqualified')
                    .filter(member => member.attributes.legalRights !== 0)
                    .map(member => 
                    <li key={Math.random()}>{member.member_id} : {member.legalRights}</li>)}
            </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ResponseParser