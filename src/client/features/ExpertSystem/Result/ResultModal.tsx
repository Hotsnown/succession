import React from 'react'
import { Family } from '../../../../core/devolution/entities'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
var Fraction = require('fractional').Fraction

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
                    .filter(member => member.attributes.legalRights !== 'unassigned')
                    .filter(member => member.attributes.legalRights !== 0)
                    .map((member, index) =>
                    <li key={index}>{member.member_id} : { (new Fraction(member.legalRights)).numerator + '/' + (new Fraction(member.legalRights)).denominator}</li>)}
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