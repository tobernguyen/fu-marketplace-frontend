import React, { Component, PropTypes } from 'react';
import './Header.scss';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onAdminSignOut } = this.props;
    return (
      <div className="admin-header">
        <Navbar inverse fluid={true} staticTop={true}>
          <Navbar.Header>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1}>
                <i className="fa fa-clock-o"></i> 23:23:23
              </NavItem>
              <NavItem eventKey={2} href="#">
                <i className="fa fa-envelope fa-lg"></i>
              </NavItem>
              <NavItem eventKey={3} href="#">
                <i className="fa fa-bell fa-lg"></i>
                <span className="badge">3</span>
              </NavItem>
              <NavDropdown eventKey={4} title="Administrator" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1} onSelect={onAdminSignOut}>Log out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  onAdminSignOut: PropTypes.func.isRequired
};
