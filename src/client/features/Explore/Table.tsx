import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';

import simpsonsTree from './examples/simpsons'
import weasleyTree from './examples/weasley'
import louisXIVTree from './examples/louisXIV'
import ordre1SansRepresentation from './examples/ordre1SansRepresentation'
import { FamilyExample } from './examples/interface';
import ordre1AvecRepresentation from './examples/ordre1AvecRepresentation';
import ordre2AvecParentsSansReprésentation from './examples/ordre2AvecParentsAvecReprésentation';
import ordre3AvecParents from './examples/ordre3AvecParents'

const Tables = () => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">A collection of example</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Number of nodes</th>
                      <th className="text-right">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examples.map(example => 
                      <tr>
                        <td>{example.name}</td>
                        <td>{example.description}</td>
                        <td>{example.numberOfNodes}</td>
                        <td className="text-right"><a href={example.link}>Click me!</a></td>
                      </tr>)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

interface ExampleRow {
  name: string;
  description: string;
  numberOfNodes: number;
  link: string;
}

const encodeFamilyUrl = (family: FamilyExample, root: string) => 
  `http://localhost:3000/succession/dashboard/data?root=${encodeURI(root)}&family=${encodeURI(JSON.stringify(family))}`

const examples: ExampleRow[] = [
  {
    name: 'Simpsons Tree',
    description: 'A simpson family',
    numberOfNodes: 10,
    link: encodeFamilyUrl(simpsonsTree, 'abe')
  },
  {
    name: 'Weasley Tree',
    description: 'A Weasley family',
    numberOfNodes: 10,
    link: encodeFamilyUrl(weasleyTree, 'arthur')
  },
  {
    name: 'louis XIV Tree',
    description: 'louisXIVTree',
    numberOfNodes: 10,
    link: encodeFamilyUrl(louisXIVTree, 'louisXIV')
  },
  {
    name: 'Ordre 1 sans Représentation',
    description: 'test',
    numberOfNodes: 10,
    link: encodeFamilyUrl(ordre1SansRepresentation, 'deCujus')
  },
  {
    name: 'Ordre 1 avec Représentantion',
    description: 'test',
    numberOfNodes: 10,
    link: encodeFamilyUrl(ordre1AvecRepresentation, 'deCujus')
  },
  {
    name: 'Ordre 2 avec parents sans représentation',
    description: 'test',
    numberOfNodes: 10,
    link: encodeFamilyUrl(ordre2AvecParentsSansReprésentation, 'father')
  },
  {
    name: 'Ordre 3 avec parents',
    description: 'test',
    numberOfNodes: 10,
    link: encodeFamilyUrl(ordre3AvecParents, 'maternal_grand_father')
  }
]

export default Tables;