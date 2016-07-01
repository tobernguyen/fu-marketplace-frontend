import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import './BlockNotificationDropdown.scss';

export default class BlockNotificationDropdown extends Component {
  render() {
    const { eventKey } = this.props;
    const title = <div>
      <i className="fa fa-bell fa-lg"/>
      <span className="badge">3</span>
    </div>;
    return (
      <NavDropdown
        eventKey={eventKey}
        title={title}
        className="block-notification-dropdown"
        id="notifications-dropdown" noCaret>
        <li className="header clearfix">
          <h4 className="title">Notifications</h4>
          <div className="actions">
            <a href="#">Mark All as Read</a>
          </div>
        </li>
        <MenuItem eventKey={eventKey}>
          Your order at Mini has been accepted. Please check.
        </MenuItem>
        <MenuItem eventKey={3.2}>
          Your order has been declined due to out of stock.
        </MenuItem>
        <MenuItem eventKey={3.3}>
          There are 13 opening shops near you.
        </MenuItem>
        <MenuItem eventKey={3.3}>
          Your order at Tho Con has been shipped.
        </MenuItem>
        <MenuItem eventKey={3.3}>
          Order completed. Please feedback Momo's service.
        </MenuItem>
        <MenuItem eventKey={3.3}>
          Your favorite shop C-Bakery has just opened.
        </MenuItem>
        <MenuItem eventKey={3.3}>
          Flash deal, please visit Ally to get 10% discount on each product.
        </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3} className="footer">See All</MenuItem>

      </NavDropdown>
    );
  }
}

BlockNotificationDropdown.propTypes = {
  eventKey: PropTypes.number.isRequired
};
