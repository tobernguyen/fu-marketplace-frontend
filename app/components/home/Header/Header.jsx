import React, { Component, PropTypes } from 'react';
import './Header.scss';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FormattedMessage } from 'react-intl';
import { links } from 'app/shared/links';
import BlockNotificationDropdown from '../BlockNotificationDropdown';

export default class Header extends Component {
  render() {
    const { onSignOut, currentUser: { roles, fullName, shops} } = this.props;
    const normalUser = roles && roles.length == 0;
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
            <Navbar.Form pullLeft className="search-form">
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              <Button type="submit"><i className="fa fa-search" aria-hidden="true"/></Button>
            </Navbar.Form>
            <Nav pullRight>
              <BlockNotificationDropdown eventKey={1} />
              <NavDropdown eventKey={2} title={fullName || ''} id="basic-nav-dropdown">
                <LinkContainer to='/account'>
                  <MenuItem eventKey={2.1}>
                    <i className="fa fa-user"/>
                    <FormattedMessage {...links.account} />
                  </MenuItem>
                </LinkContainer>
                <LinkContainer to='/orders'>
                  <MenuItem eventKey={2.1}>
                    <i className="fa fa-list-ol"/>
                    <FormattedMessage {...links.myOrders} />
                  </MenuItem>
                </LinkContainer>
                <MenuItem divider />
                {normalUser &&
                <LinkContainer to='/shops/request_create'>
                  <MenuItem eventKey={2.3}>
                    <i className="fa fa-opencart"/>
                    <FormattedMessage {...links.openShop} />
                  </MenuItem>
                </LinkContainer>}
                {shops instanceof Array && shops.map((shop) => {
                  return (
                    <LinkContainer key={shop.id} to={`/shops/${shop.id}/dashboard`}>
                      <MenuItem eventKey={2.3}>
                        <i className="fa fa-opencart"/> {shop.name}
                      </MenuItem>
                    </LinkContainer>
                  )
                })}
                <MenuItem divider />
                <MenuItem eventKey={2.4}>
                  <i className="fa fa-cog"/>
                  <FormattedMessage {...links.settings} />
                </MenuItem>
                <MenuItem eventKey={2.5} onSelect={onSignOut}>
                  <i className="fa fa-sign-in"/>
                  <FormattedMessage {...links.logOut} />
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.6}>
                  <i className="fa fa-life-ring"/>
                  <FormattedMessage {...links.support} />
                </MenuItem>
                <MenuItem eventKey={2.7}>
                  <i className="fa fa-bug"/>
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
