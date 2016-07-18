import React, { Component, PropTypes } from 'react';
import './Header.scss';
import { Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FormattedMessage } from 'react-intl';
import { links } from 'app/shared/links';
import BlockNotificationDropdown from '../BlockNotificationDropdown';
import { Link } from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    };

    this.handleKeywordChange = (e) => {
      this.setState({
        keyword: e.target.value
      })
    };

    this.handleSearch = () => {
      this.props.handleSearch(this.state.keyword);
    };

    this.handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.props.handleSearch(this.state.keyword);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { keyword } = nextProps;
    if (keyword !== this.state.keyword) {
      this.setState({
        keyword: keyword
      })
    }
  }

  render() {
    const {
      onSignOut,
      currentUser: {
        roles,
        fullName,
        shops
      },
      displaySearch,
      notifications,
      onNotificationClick,
      markAsAllRead,
      hasMoreNotifications,
      loadMoreNotifications,
      clearNotifications
    } = this.props;
    // const normalUser = roles && roles.length == 0;
    return (
      <div className="home-header">
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                FU Marketplace
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {displaySearch && <Navbar.Form pullLeft className="search-form">
              <FormGroup>
                <FormControl
                  type="text"
                  ref="keyword"
                  placeholder="Search"
                  value={this.state.keyword}
                  onKeyPress={this.handleKeyPress}
                  onChange={this.handleKeywordChange} />
              </FormGroup>
              <Button type="submit" onClick={this.handleSearch}>
                <i className="fa fa-search" aria-hidden="true"/>
              </Button>
            </Navbar.Form>}
            <Nav pullRight>
              <BlockNotificationDropdown
                clearNotifications={clearNotifications}
                notifications={notifications}
                hasMoreNotifications={hasMoreNotifications}
                loadMoreNotifications={loadMoreNotifications}
                eventKey={1}
                markAsAllRead={markAsAllRead}
                onNotificationClick={onNotificationClick} />
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
                {shops instanceof Array && shops.map((shop) =>
                  <LinkContainer key={shop.id} to={`/dashboard/shops/${shop.id}`}>
                    <MenuItem eventKey={2.3}>
                      <i className="shop-init">{shop.name[0]}</i> {shop.name}
                    </MenuItem>
                  </LinkContainer>
                )}
                <LinkContainer to='/shops/request_create'>
                  <MenuItem eventKey={2.3}>
                    <i className="fa fa-flag-o"/>
                    <FormattedMessage {...links.openShop} />
                  </MenuItem>
                </LinkContainer>
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
  currentUser: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  onNotificationClick: PropTypes.func.isRequired,
  markAsAllRead: PropTypes.func.isRequired,
  loadMoreNotifications: PropTypes.func.isRequired
};

Header.defaultProps = {
  currentUser: {}
};
