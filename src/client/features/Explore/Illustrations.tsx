/* prettier-ignore */
/*eslint-disable*/

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
    tags: ['Représentation'],
    numberOfNodes: countMembers(Ordre1),
    link: encodeFamilyUrl(Ordre1, 'deCujus', 'deCujus')
  },
  {
    name: 'Ordre 2',
    tags: ['Représentation', 'Collatéraux Privilégiés'],
    numberOfNodes: countMembers(Ordre2),
    link: encodeFamilyUrl(Ordre2, 'father', 'deCujus')
  },
  {
    name: 'Ordre 3',
    tags: ['Fente (ascendants)', 'Collatéraux Privilégiés'],
    numberOfNodes: countMembers(Ordre3),
    link: encodeFamilyUrl(Ordre3, 'maternal_grand_father', 'deCujus')
  },
  {
    name: 'Ordre 4',
    tags: ['Fente (collatéraux)'],
    numberOfNodes: countMembers(Ordre4),
    link: encodeFamilyUrl(Ordre4, 'paternal_grand_father', 'deCujus')
  }
]

function countMembers (family: extendedJsonGedcomData): number {
  return family.indis.length
}

function encodeFamilyUrl (family: extendedJsonGedcomData, root: string, deCujus: string) {
  return "/succession/tree/view?url=https%3A%2F%2Fwebtreeprint.com%2Ftp_downloader.php%3Fpath%3Dfamous_gedcoms%2Fshakespeare.ged&data="+encodeURI(JSON.stringify(family))+"&root="+root+"&deCujus="+deCujus
}

export default Tables;