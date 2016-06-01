import React, { Component, PropTypes } from 'react';
import './Header.scss';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
            <Nav pullRight activeKey={1}>
              <NavItem eventKey={1} href="#"><i className="fa fa-home" aria-hidden="true"></i> Home</NavItem>
              <NavItem eventKey={2} href="#"><i className="fa fa-bell" aria-hidden="true"></i> Notifications</NavItem>
              <NavDropdown eventKey={3} title={currentUser.fullName || ''} id="basic-nav-dropdown">
                <LinkContainer to={{
                  pathname: '/account',
                  state: { modal: true }
                }}>
                  <MenuItem eventKey={3.1}>Tài khoản</MenuItem>
                </LinkContainer>
                <MenuItem eventKey={3.2}>Đơn hàng</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Mở shop</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Thiết đặt</MenuItem>
                <MenuItem eventKey={3.5} onSelect={onSignOut}>Đăng xuất</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.5}>Hỗ trợ</MenuItem>
                <MenuItem eventKey={3.5}>Báo cáo vấn đề</MenuItem>
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
