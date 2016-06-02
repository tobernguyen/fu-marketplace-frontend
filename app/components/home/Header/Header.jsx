import React, { Component, PropTypes } from 'react';
import './Header.scss';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FormattedMessage } from 'react-intl';
import { links } from 'app/shared/links';

export default class Header extends Component {
  render() {
    const { onSignOut, currentUser } = this.props;
    return (
      <div className="home-header">
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">FU Marketplace</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              <Button type="submit"><i className="fa fa-search" aria-hidden="true"></i></Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <i className="fa fa-bell fa-lg"></i>
                <span className="badge">3</span>
              </NavItem>
              <NavDropdown eventKey={2} title={currentUser.fullName || ''} id="basic-nav-dropdown">
                <LinkContainer to={{
                  pathname: '/account',
                  state: { modal: true }
                }}>
                  <MenuItem eventKey={2.1}>
                    <FormattedMessage {...links.account} />
                  </MenuItem>
                </LinkContainer>
                <MenuItem eventKey={2.2}>
                  <FormattedMessage {...links.myOrders} />
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.3}>
                  <FormattedMessage {...links.openShop} />
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.4}>
                  <FormattedMessage {...links.settings} />
                </MenuItem>
                <MenuItem eventKey={2.5} onSelect={onSignOut}>
                  <FormattedMessage {...links.logOut} />
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.6}>
                  <FormattedMessage {...links.support} />
                </MenuItem>
                <MenuItem eventKey={2.7}>
                  <FormattedMessage {...links.reportIssue} />
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

Header.defaultProps = {
  currentUser: {}
};
