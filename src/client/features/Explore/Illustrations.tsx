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
import { Link } from 'react-router-dom'

import Ordre1 from './examples/Ordre1'
import Ordre2 from './examples/Ordre2';
import Ordre3 from './examples/Ordre3'
import Ordre4 from './examples/Ordre4'
import { extendedJsonGedcomData } from './examples/extendedJsonGedcomData'
import { UrlBuilder } from './UrlBuilder';

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
                        {console.log(illustration.link)}
                        <td><Link to={illustration.link}>Click me!</Link></td>
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
    name: 'Ordre 1',
    tags: ['Ordre 1', 'Représentation'],
    numberOfNodes: countMembers(Ordre1),
    link: new UrlBuilder()
                .addFamily(Ordre1)
                .addDeCujus('deCujus')
                .addRoot('deCujus')
                .addName('Ordre 1')
                .build()
  },
  {
    name: 'Ordre 2',
    tags: ['Ordre 2', 'Représentation', 'Collatéraux Privilégiés'],
    numberOfNodes: countMembers(Ordre2),
    link: new UrlBuilder()
            .addFamily(Ordre2)
            .addDeCujus('deCujus')
            .addRoot('father')
            .addName('Ordre 2')
            .build()    
  },
  {
    name: 'Ordre 3',
    tags: ['Ordre 3', 'Fente (ascendants)', 'Collatéraux Privilégiés'],
    numberOfNodes: countMembers(Ordre3),
    link: new UrlBuilder()
            .addFamily(Ordre3)
            .addDeCujus('deCujus')
            .addRoot('maternal_grand_father')
            .addName('Ordre 3')
            .build()    
  },
  {
    name: 'Ordre 4',
    tags: ['Ordre 4', 'Fente (collatéraux)'],
    numberOfNodes: countMembers(Ordre4),
    link: new UrlBuilder()
            .addFamily(Ordre4)
            .addDeCujus('deCujus')
            .addRoot('paternal_grand_father')
            .addName('Ordre 4')
            .build()    
  }
]

function countMembers (family: extendedJsonGedcomData): number {
  return family.indis.length
}

export default Tables;