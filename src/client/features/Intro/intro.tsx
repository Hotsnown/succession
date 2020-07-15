import * as React from 'react';
import logo from './topola.jpg';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Intro() {
  const contents = (
    <>
      <p>Didactis is an automated legal reasoning tool applied to french inheritance law.</p>
      <p>Go to the tree pannel to start a new form. Fill it out and get each member's legal right with the Click me button.</p>
      <p>Here are some examples you can start with:</p>
      <ul>
        <li> 
          <Link 
              to="http://localhost:3000/succession/dashboard/data?root=abe&family=%7B%22abe%22:%7B%22id%22:%22abe%22,%22name%22:%22Abraham%20J.%20(Grandpa)%20Simpson%22,%22partners%22:%5B%22unknown%22,%22mona%22%5D,%22children%22:%7B%22unknown%22:%5B%22herb%22%5D,%22mona%22:%5B%22homer%22%5D%7D,%22status%22:%22valid%22%7D,%22unknown%22:%7B%22id%22:%22unknown%22,%22name%22:%22???%22,%22status%22:%22valid%22%7D,%22mona%22:%7B%22id%22:%22mona%22,%22name%22:%22Mona%20Penelope%20Simpson%20(n%C3%A9e%20Olsen)%22,%22status%22:%22valid%22%7D,%22herb%22:%7B%22id%22:%22herb%22,%22name%22:%22Herbert%20(Herb)%20Powell%22,%22status%22:%22valid%22%7D,%22homer%22:%7B%22id%22:%22homer%22,%22name%22:%22Homer%20Jay%20Simpson%22,%22partners%22:%5B%22marge%22%5D,%22children%22:%7B%22marge%22:%5B%22bart%22,%22lisa%22,%22maggie%22%5D%7D,%22status%22:%22valid%22%7D,%22marge%22:%7B%22id%22:%22marge%22,%22name%22:%22Marjorie%20(Marge)%20Simpson%20(n%C3%A9e%20Bouvier)%22,%22status%22:%22valid%22%7D,%22bart%22:%7B%22id%22:%22bart%22,%22name%22:%22Bartholomew%20(Bart)%20JoJo%20Simpson%22,%22status%22:%22valid%22%7D,%22lisa%22:%7B%22id%22:%22lisa%22,%22name%22:%22Lisa%20Marie%20Simpson%22,%22partners%22:%5B%22millhouse%22%5D,%22children%22:%7B%22millhouse%22:%5B%22millhouse_jr%22%5D%7D,%22status%22:%22valid%22%7D,%22maggie%22:%7B%22id%22:%22maggie%22,%22name%22:%22Margaret%20(Maggie)%20Eve%20Simpson%22,%22status%22:%22valid%22%7D,%22millhouse%22:%7B%22id%22:%22millhouse%22,%22name%22:%22Millhouse%20Van%20Houten%22,%22status%22:%22valid%22%7D,%22millhouse_jr%22:%7B%22id%22:%22millhouse_jr%22,%22name%22:%22Millhouse%20Van%20Houten%20Jr.%22,%22status%22:%22valid%22%7D%7D"
          >Simpson's family</Link>
        </li>
        <li>
          <Link
            to="http://localhost:3000/succession/dashboard/data?root=rickard&family=%7B%22rickard%22:%7B%22id%22:%22rickard%22,%22name%22:%22Rickard%20Stark%22,%22partners%22:%5B%22lyarra%22%5D,%22children%22:%7B%22lyarra%22:%5B%22benjen%22,%22brandon%22,%22lyanna%22,%22eddard%22%5D%7D,%22status%22:%22invalid%22%7D,%22lyarra%22:%7B%22id%22:%22lyarra%22,%22name%22:%22Lyarra%20Stark%22,%22status%22:%22invalid%22%7D,%22benjen%22:%7B%22id%22:%22benjen%22,%22name%22:%22Benjen%20Stark%22,%22status%22:%22invalid%22%7D,%22brandon%22:%7B%22id%22:%22brandon%22,%22name%22:%22Brandon%20Stark%22,%22status%22:%22invalid%22%7D,%22lyanna%22:%7B%22id%22:%22lyanna%22,%22name%22:%22Lyanna%20Stark%22,%22status%22:%22invalid%22%7D,%22eddard%22:%7B%22id%22:%22eddard%22,%22name%22:%22Eddard%20(Ned)%20Stark%22,%22partners%22:%5B%22catelyn%22%5D,%22children%22:%7B%22catelyn%22:%5B%22bran%22,%22arya%22,%22rickon%22,%22robb%22,%22sansa%22%5D%7D,%22status%22:%22invalid%22%7D,%22catelyn%22:%7B%22id%22:%22catelyn%22,%22name%22:%22Catelyn%20Stark%22,%22status%22:%22invalid%22%7D,%22bran%22:%7B%22id%22:%22bran%22,%22name%22:%22Bran%20Stark%22,%22status%22:%22valid%22%7D,%22arya%22:%7B%22id%22:%22arya%22,%22name%22:%22Arya%20Stark%22,%22status%22:%22valid%22%7D,%22rickon%22:%7B%22id%22:%22rickon%22,%22name%22:%22Rickon%20Stark%22,%22status%22:%22invalid%22%7D,%22robb%22:%7B%22id%22:%22robb%22,%22name%22:%22Robb%20Stark%22,%22status%22:%22invalid%22%7D,%22sansa%22:%7B%22id%22:%22sansa%22,%22name%22:%22Sansa%20Stark%22,%22status%22:%22valid%22%7D%7D"
            >Stark's family</Link>
        </li>
        <li>
          <Link
            to="http://localhost:3000/succession/dashboard/data?root=rickard&family=%7B%22rickard%22:%7B%22id%22:%22rickard%22,%22name%22:%22Rickard%20Stark%22,%22partners%22:%5B%22lyarra%22%5D,%22children%22:%7B%22lyarra%22:%5B%22benjen%22,%22brandon%22,%22lyanna%22,%22eddard%22%5D%7D,%22status%22:%22invalid%22%7D,%22lyarra%22:%7B%22id%22:%22lyarra%22,%22name%22:%22Lyarra%20Stark%22,%22status%22:%22invalid%22%7D,%22benjen%22:%7B%22id%22:%22benjen%22,%22name%22:%22Benjen%20Stark%22,%22status%22:%22invalid%22%7D,%22brandon%22:%7B%22id%22:%22brandon%22,%22name%22:%22Brandon%20Stark%22,%22status%22:%22invalid%22%7D,%22lyanna%22:%7B%22id%22:%22lyanna%22,%22name%22:%22Lyanna%20Stark%22,%22status%22:%22invalid%22%7D,%22eddard%22:%7B%22id%22:%22eddard%22,%22name%22:%22Eddard%20(Ned)%20Stark%22,%22partners%22:%5B%22catelyn%22%5D,%22children%22:%7B%22catelyn%22:%5B%22bran%22,%22arya%22,%22rickon%22,%22robb%22,%22sansa%22%5D%7D,%22status%22:%22invalid%22%7D,%22catelyn%22:%7B%22id%22:%22catelyn%22,%22name%22:%22Catelyn%20Stark%22,%22status%22:%22invalid%22%7D,%22bran%22:%7B%22id%22:%22bran%22,%22name%22:%22Bran%20Stark%22,%22status%22:%22valid%22%7D,%22arya%22:%7B%22id%22:%22arya%22,%22name%22:%22Arya%20Stark%22,%22status%22:%22valid%22%7D,%22rickon%22:%7B%22id%22:%22rickon%22,%22name%22:%22Rickon%20Stark%22,%22status%22:%22invalid%22%7D,%22robb%22:%7B%22id%22:%22robb%22,%22name%22:%22Robb%20Stark%22,%22status%22:%22invalid%22%7D,%22sansa%22:%7B%22id%22:%22sansa%22,%22name%22:%22Sansa%20Stark%22,%22status%22:%22valid%22%7D%7D"
            >Weasley's family</Link>
        </li>
      </ul>
      <p>
        <b>Privacy</b>
        {': '}
            This site does not send your data anywhere and the assessed legal rights will not be shared.
      </p>
    </>
  );

  return (
    <div className="content" style={{display: 'flex', alignItems: 'center'}}>
      <div className="intro">
        <Card >
            <Card.Header>
            Topola Genealogy Viewer
            </Card.Header>
          <Card.Body>
              <Row>
                <Col>
                  <Image src={logo} alt="Topola logo" />
                </Col>
                <Col>{contents}</Col>
              </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}