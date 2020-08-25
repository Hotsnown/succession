/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
import { Link } from 'react-router-dom'

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
            {footerItems.map((footerItem, index) =>
              <>
                {index === 0 ? null : '  •  '}
                <li key={index}><a href={footerItem.url}>{footerItem.text}</a></li>
              </>
              )}
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
    url: '/succession/aboutus',
    text: 'A propos'
  },
  {
    url: '/succession/contact',
    text: 'Contact'
  }
]

export default Footer;
