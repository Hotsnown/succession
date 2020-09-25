import * as queryString from 'query-string';
import * as React from 'react';
import {IndiInfo, JsonGedcomData} from 'topola';
import {Link, RouteComponentProps} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';

interface EventHandlers {
  onSelection: (indiInfo: IndiInfo) => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
  onDownloadPng: () => void;
  onDownloadSvg: () => void;
}

interface Props {
  showingChart: boolean;
  data?: JsonGedcomData;
  standalone: boolean;
  allowAllRelativesChart: boolean;
  eventHandlers: EventHandlers;
  title: string
  deCujus: string
  processSolution: () => void
}

export class TopBar extends React.Component<RouteComponentProps & Props> {
  
  private changeView(view: string) {
    const location = this.props.location;
    const search = queryString.parse(location.search);
    if (search.view !== view) {
      search.view = view;
      location.search = queryString.stringify(search);
      this.props.history.push(location);
    }
  }

  render() {
    return (
      <Navbar
        color={"dark"}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <NavbarBrand href="/">{this.props.title}</NavbarBrand>
          </div>
          <NavbarToggler onClick={() => {}}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={true}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
            <h5 style={{color: "white"}}>Current De Cujus : {this.props.deCujus}</h5>
            <ButtonGroup aria-label="Expert System Controller">
                <Button onClick={this.props.processSolution}>Update De Cujus</Button>
                <Button onClick={this.props.processSolution}>Click me</Button>
            </ButtonGroup>
=              <Dropdown
                nav
                isOpen={true}
                toggle={() => {}}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem onClick={() => this.changeView('hourglass')}>
                  <i className="hourglass" />
                  Hourglass chart
                </DropdownItem>
                <DropdownItem onClick={() => this.changeView('relatives')}>
                  <i className="users" />
                  All relatives Chart
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                nav
                isOpen={true}
                toggle={() => {}}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Download</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.props.eventHandlers.onDownloadPdf()}>
                    <i className="hourglass" />
                    Download PDF
                  </DropdownItem>
                  <DropdownItem onClick={() => this.props.eventHandlers.onDownloadPng()}>
                    <i className="users" />
                    Download PNG
                  </DropdownItem>
                  <DropdownItem onClick={() => this.props.eventHandlers.onDownloadSvg()}>
                    Download SVG
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                nav
                isOpen={true}
                toggle={() => {}}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Open</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    UploadMenu
                  </DropdownItem>
                  <DropdownItem>
                    UrlMenu
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem onClick={() => this.props.eventHandlers.onPrint()}>
                <i className="print" />
                <p style={{color: "white"}}>Print</p>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}