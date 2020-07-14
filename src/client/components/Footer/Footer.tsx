/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";

interface FooterProps {
  default?: boolean
  fluid?: boolean
}

const Footer = (props: FooterProps) => (
  <footer
    className={"footer" + (props.default ? " footer-default" : "")}
  >
    <Container fluid={props.fluid ? true : false}>
      <Row>
        <nav className="footer-nav">
          <ul>
            {footerItems.map(footerItem =>
              <li key={Math.random()}><a href={footerItem.url} target="_blank">{footerItem.text}</a></li>)}
          </ul>
        </nav>
        {/* <div className="credits ml-auto">
          <div className="copyright">
            &copy; {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
              </div>
        </div> */}
      </Row>
    </Container>
  </footer>
);

interface footerItem {
  url: string;
  text: string
}

const footerItems: footerItem[] = [
  {
    url: '/',
    text: 'En savoir plus'
  },
  {
    url: '/',
    text: 'About Me'
  },
  {
    url: '/',
    text: 'Me contacter'
  }
]

export default Footer;
