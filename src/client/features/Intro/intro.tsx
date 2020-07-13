import * as React from 'react';
import logo from './topola.jpg';
import {Card, Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';

/** The intro page. */
export function Intro() {
  const contents = (
    <>
      <p> Topola Genealogy is a genealogy tree viewer that lets you browse the structure of the family.</p>
      <p> Use the OPEN FILE or LOAD FROM URL buttons above to load a GEDCOM file. You can export a GEDCOM file from most of the existing genealogy programs and web sites.'</p>
      <p> Here are some examples from the web that you can view:</p>
      <ul>
        <li>
          <Link
            to="http://localhost:3000/succession/dashboard/data?root=abe&family=%7B%22abe%22:%7B%22id%22:%22abe%22,%22name%22:%22Abraham%20J.%20(Grandpa)%20Simpson%22,%22partners%22:%5B%22unknown%22,%22mona%22%5D,%22children%22:%7B%22unknown%22:%5B%22herb%22%5D,%22mona%22:%5B%22homer%22%5D%7D,%22status%22:%22valid%22%7D,%22unknown%22:%7B%22id%22:%22unknown%22,%22name%22:%22???%22,%22status%22:%22valid%22%7D,%22mona%22:%7B%22id%22:%22mona%22,%22name%22:%22Mona%20Penelope%20Simpson%20(n%C3%A9e%20Olsen)%22,%22status%22:%22valid%22%7D,%22herb%22:%7B%22id%22:%22herb%22,%22name%22:%22Herbert%20(Herb)%20Powell%22,%22status%22:%22valid%22%7D,%22homer%22:%7B%22id%22:%22homer%22,%22name%22:%22Homer%20Jay%20Simpson%22,%22partners%22:%5B%22marge%22%5D,%22children%22:%7B%22marge%22:%5B%22bart%22,%22lisa%22,%22maggie%22%5D%7D,%22status%22:%22valid%22%7D,%22marge%22:%7B%22id%22:%22marge%22,%22name%22:%22Marjorie%20(Marge)%20Simpson%20(n%C3%A9e%20Bouvier)%22,%22status%22:%22valid%22%7D,%22bart%22:%7B%22id%22:%22bart%22,%22name%22:%22Bartholomew%20(Bart)%20JoJo%20Simpson%22,%22status%22:%22valid%22%7D,%22lisa%22:%7B%22id%22:%22lisa%22,%22name%22:%22Lisa%20Marie%20Simpson%22,%22partners%22:%5B%22millhouse%22%5D,%22children%22:%7B%22millhouse%22:%5B%22millhouse_jr%22%5D%7D,%22status%22:%22valid%22%7D,%22maggie%22:%7B%22id%22:%22maggie%22,%22name%22:%22Margaret%20(Maggie)%20Eve%20Simpson%22,%22status%22:%22valid%22%7D,%22millhouse%22:%7B%22id%22:%22millhouse%22,%22name%22:%22Millhouse%20Van%20Houten%22,%22status%22:%22valid%22%7D,%22millhouse_jr%22:%7B%22id%22:%22millhouse_jr%22,%22name%22:%22Millhouse%20Van%20Houten%20Jr.%22,%22status%22:%22valid%22%7D%7D"
          >
              simpsonsTree
            </Link>
        </li>
      </ul>
      <p>
        <b>Privacy</b>
        {': '}
            When using the "load from file" option, this site does not send your data anywhere and files loaded from disk do not leave your computer. When using "load from URL", data is passed through the service to deal with an issue with cross-site file loading in the browser (CORS).'
      </p>
    </>
  );

  return (
    <div className="content" style={{display: 'flex', alignItems: 'center'}}>
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
  );
}