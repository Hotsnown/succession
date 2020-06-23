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
import { FamilyExample } from './examples/interface';

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

interface Example {
  name: string;
  description: string;
  numberOfNodes: number;
  link: string;
}

const encodeFamilyUrl = (family: FamilyExample, root: string) => 
  `http://localhost:3000/admin/dashboard/data?root=${encodeURI(root)}&family=${encodeURI(JSON.stringify(family))}`

const examples: Example[] = [
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
  }
]

export default Tables;
