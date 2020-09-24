import * as queryString from 'query-string';
import * as React from 'react';
import {IndiInfo, JsonGedcomData} from 'topola';
import {Link, RouteComponentProps} from 'react-router-dom';
import {MenuType} from './menu-item';
import {Icon, Menu, Dropdown, Responsive} from 'semantic-ui-react';

enum ScreenSize {
  LARGE,
  SMALL,
}

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

  private chartMenus(screenSize: ScreenSize) {
    if (!this.props.showingChart) {
      return null;
    }
    const chartTypeItems = (
      <>
        <Dropdown.Item onClick={() => this.changeView('hourglass')}>
          <Icon name="hourglass" />
          Hourglass chart
        </Dropdown.Item>
        {this.props.allowAllRelativesChart ? (
          <Dropdown.Item onClick={() => this.changeView('relatives')}>
            <Icon name="users" />
            All relatives
          </Dropdown.Item>
        ) : null}
        <Dropdown.Item onClick={() => this.changeView('fancy')}>
          <Icon name="users" />
            Fancy tree (experimental)
        </Dropdown.Item>
      </>
    );
    switch (screenSize) {
      case ScreenSize.LARGE:
        return (
          <>
            <Menu.Item onClick={() => this.props.eventHandlers.onPrint()}>
              <Icon name="print" />
              Print
            </Menu.Item>

            <Dropdown
              trigger={
                <div>
                  <Icon name="download" />
                  Download
                </div>
              }
              className="item"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.props.eventHandlers.onDownloadPdf()}
                  text={'PDF file'}
                >
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.props.eventHandlers.onDownloadPng()}
                  text={'PNG file'}
                >
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.props.eventHandlers.onDownloadSvg()}
                  text={'SVG file'}
                >
                  
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              trigger={
                <div>
                  <Icon name="eye" />
                  View
                </div>
              }
              className="item"
            >
              <Dropdown.Menu>{chartTypeItems}</Dropdown.Menu>
            </Dropdown>
          </>
        );

      case ScreenSize.SMALL:
        return (
          <>
            <Dropdown.Item onClick={() => this.props.eventHandlers.onPrint()}>
              <Icon name="print" />
              Print
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item
              onClick={() => this.props.eventHandlers.onDownloadPdf()}
            >
              <Icon name="download" />
              Download PDF
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => this.props.eventHandlers.onDownloadPng()}
            >
              <Icon name="download" />
              Download PNG
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => this.props.eventHandlers.onDownloadSvg()}
            >
              <Icon name="download" />
              Download SVG
            </Dropdown.Item>

            <Dropdown.Divider />
            {chartTypeItems}
            <Dropdown.Divider />
          </>
        );
    }
  }

  private title() {
    return (
      <Menu.Item>
        <b>Topola Genealogy</b>
      </Menu.Item>
    );
  }

  private fileMenus(screenSize: ScreenSize) {
    // Don't show "open" menus in non-standalone mode.
    if (!this.props.standalone) {
      return null;
    }

    switch (screenSize) {
      case ScreenSize.LARGE:
        // Show dropdown if chart is shown, otherwise show individual menu
        // items.
        const menus = this.props.showingChart ? (
          <Dropdown
            trigger={
              <div>
                <Icon name="folder open" />
                Open
              </div>
            }
            className="item"
          >
            <Dropdown.Menu>
            UploadMenu
            UrlMenu
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            UploadMenu
            UrlMenu
          </>
        );
        return menus;

      case ScreenSize.SMALL:
        return (
          <>
            UploadMenu
            UrlMenu
            <Dropdown.Divider />
          </>
        );
    }
  }

  private mobileMenus() {
    return (
      <>
        <Dropdown
          trigger={
            <div>
              <Icon name="sidebar" />
            </div>
          }
          className="item"
          icon={null}
        >
          <Dropdown.Menu>
            {this.fileMenus(ScreenSize.SMALL)}
            {this.chartMenus(ScreenSize.SMALL)}

            <Dropdown.Item
              href="https://github.com/PeWu/topola-viewer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {this.props.standalone ? (
          <Link to="/">{this.title()}</Link>
        ) : (
          this.title()
        )}
      </>
    );
  }

  private desktopMenus() {
    return (
      <>
        {this.props.standalone ? <Link to="/">{this.title()}</Link> : null}
        {this.fileMenus(ScreenSize.LARGE)}
        {this.chartMenus(ScreenSize.LARGE)}
        <Menu.Menu position="right">
          <Menu.Item
            href="https://github.com/PeWu/topola-viewer"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub project
          </Menu.Item>
        </Menu.Menu>
      </>
    );
  }

  render() {
    return (
      <>
        <Responsive
          as={Menu}
          attached="top"
          inverted
          color="blue"
          size="large"
          minWidth={768}
        >
          {this.desktopMenus()}
        </Responsive>
        <Responsive
          as={Menu}
          attached="top"
          inverted
          color="blue"
          size="large"
          maxWidth={767}
        >
          {this.mobileMenus()}
        </Responsive>
      </>
    );
  }
}