import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Badge,
} from 'reactstrap';

import { FamilyExample } from './examples/interface';
import simpsonsTree from './examples/simpsons'
import weasleyTree from './examples/weasley'
import starkTree from './examples/stark'
import greekgods from './examples/greekgods'
import louisXIVTree from './examples/louisXIV'
import conjointSurvivant from './examples/conjointSurvivant'
import ordre1 from './examples/ordre1'
import ordre2 from './examples/ordre2';
import ordre3 from './examples/ordre3'
import ordre4 from './examples/ordre4'

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
                      <th>Complexity</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {illustrations.map(illustration => 
                      <tr>
                        <td>{illustration.name}</td>
                          <td>{illustration.tags.map(tag => <Badge color="primary" style={{marginRight: '5px'}}>{tag}</Badge>)}</td>
                        <td>{illustration.numberOfNodes}</td>
                        <td><a href={illustration.link}>Click me!</a></td>
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

interface Illustration {
  name: string;
  tags: string[];
  numberOfNodes: number;
  link: string;
}

const illustrations: Illustration[] = [
  {
    name: 'Simpsons Tree',
    tags: ['Fiction'],
    numberOfNodes: countMembers(simpsonsTree),
    link: encodeFamilyUrl(simpsonsTree, 'abe')
  },
  {
    name: 'Weasley Tree',
    tags: ['Fiction'],
    numberOfNodes: countMembers(weasleyTree),
    link: encodeFamilyUrl(weasleyTree, 'arthur')
  },
  {
    name: 'Stark Tree',
    tags: ['Fiction', 'Deaths'],
    numberOfNodes: countMembers(starkTree),
    link: encodeFamilyUrl(starkTree, 'rickard')
  },
  {
    name: 'Greek Gods',
    tags: ['Fiction'],
    numberOfNodes: countMembers(greekgods),
    link: encodeFamilyUrl(greekgods, 'chaos')
  },
  {
    name: 'louis XIV Tree',
    tags: ['Historic'],
    numberOfNodes: countMembers(louisXIVTree),
    link: encodeFamilyUrl(louisXIVTree, 'louisXIV')
  },
  {
    name: 'Avec Conjoint Survivant Tree',
    tags: ['Conjoint'],
    numberOfNodes: countMembers(conjointSurvivant),
    link: encodeFamilyUrl(conjointSurvivant, 'deCujus')
  },
  {
    name: 'Ordre 1',
    tags: ['Représentation'],
    numberOfNodes: countMembers(ordre1),
    link: encodeFamilyUrl(ordre1, 'deCujus')
  },
  {
    name: 'Ordre 2',
    tags: ['Représentation', 'Collatéraux Privilégiés'],
    numberOfNodes: countMembers(ordre2),
    link: encodeFamilyUrl(ordre2, 'father')
  },
  {
    name: 'Ordre 3',
    tags: ['Fente (ascendants)', 'Collatéraux Privilégiés'],
    numberOfNodes: countMembers(ordre3),
    link: encodeFamilyUrl(ordre3, 'maternal_grand_father')
  },
  {
    name: 'Ordre 4',
    tags: ['Fente (collatéraux)'],
    numberOfNodes: countMembers(ordre4),
    link: encodeFamilyUrl(ordre4, 'paternal_grand_father')
  }
]

function countMembers (family: FamilyExample): number {
  return Object.keys(family).length
}

function encodeFamilyUrl (family: FamilyExample, root: string) {
  return `http://${process.env.NODE_ENV === 'production' ? window.location.hostname : 'localhost:3000'}/succession/dashboard/data?root=${encodeURI(root)}&family=${encodeURI(JSON.stringify(family))}`
}


export default Tables;