import React, { Component, PropTypes } from 'react';
import './Header.scss';
import { Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button, NavItem } from 'react-bootstrap';
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

  renderUserNavDropdown() {
    const {
      onSignOut,
      currentUser: {
        fullName,
        shops,
        avatar
      }
    } = this.props;

    const titleNode = <div>
      <span className="user-avatar">
        <img src={avatar}  />
      </span>
      <span className="user-title">
        {fullName || ''}
      </span>
    </div>;

    return (
      <NavDropdown eventKey={3} title={titleNode} id="basic-nav-dropdown" className="navbar-user" noCaret>
        <LinkContainer to='/account'>
          <MenuItem eventKey={3.1}>
            <i className="fa fa-user"/>
            <FormattedMessage {...links.account} />
          </MenuItem>
        </LinkContainer>
        <MenuItem divider />
        {shops instanceof Array && shops.map((shop) =>
          <LinkContainer key={shop.id} to={`/dashboard/shops/${shop.id}`}>
            <MenuItem eventKey={3.2}>
              <i className="shop-init">{shop.name[0]}</i> {shop.name}
            </MenuItem>
          </LinkContainer>
        )}
        <LinkContainer to='/shops/request_create'>
          <MenuItem eventKey={3.3}>
            <i className="fa fa-flag-o"/>
            <FormattedMessage {...links.openShop} />
          </MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>
          <i className="fa fa-cog"/>
          <FormattedMessage {...links.settings} />
        </MenuItem>
        <MenuItem eventKey={3.5} onSelect={onSignOut}>
          <i className="fa fa-sign-in"/>
          <FormattedMessage {...links.logOut} />
        </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.6}>
          <i className="fa fa-life-ring"/>
          <FormattedMessage {...links.support} />
        </MenuItem>
        <MenuItem eventKey={3.7}>
          <i className="fa fa-bug"/>
          <FormattedMessage {...links.reportIssue} />
        </MenuItem>
      </NavDropdown>
    )
  }

  render() {
    const {
      displaySearch,
      notifications,
      onNotificationClick,
      markAsAllRead,
      hasMoreNotifications,
      loadMoreNotifications,
      clearNotifications,
      unreadCount
    } = this.props;

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
              <LinkContainer to='/orders'>
                <NavItem className="navbar-orders" eventKey={1} href="#">
                  <i className="fa fa-list-ol"/> <FormattedMessage {...links.myOrders} />
                </NavItem>
              </LinkContainer>
              <BlockNotificationDropdown
                clearNotifications={clearNotifications}
                notifications={notifications}
                unreadCount={unreadCount}
                hasMoreNotifications={hasMoreNotifications}
                loadMoreNotifications={loadMoreNotifications}
                eventKey={2}
                markAsAllRead={markAsAllRead}
                onNotificationClick={onNotificationClick} />
              {this.renderUserNavDropdown()}
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
