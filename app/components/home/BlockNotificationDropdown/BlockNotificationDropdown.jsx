import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import './BlockNotificationDropdown.scss';
import { FormattedRelative, FormattedHTMLMessage } from 'react-intl';
import { messages } from './BlockNotificationDropdown.i18n';

export default class BlockNotificationDropdown extends Component {
  render() {
    const { eventKey, notifications } = this.props;
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
        {notifications.map((notification, index) =>{
          const { data: { buyerName, shopName, buyerAvatar }, createdAt, type } = notification;
          const notificationTime = new Date(createdAt);
          return (
            <MenuItem className="notification-item" key={index} eventKey={eventKey}>
              <div className="clearfix">
                <div className="pull-left buyer-avatar">
                  <img src={buyerAvatar} />
                </div>
                <div className="content">
                  <FormattedHTMLMessage values={{ buyerName: buyerName, shopName: shopName }} {...messages.notification[type]} />
                  <p>
                    <FormattedRelative value={notificationTime}/>
                  </p>
                </div>
              </div>
            </MenuItem>
          )
        })}

        <MenuItem divider />
        <MenuItem eventKey={3.3} className="footer">See All</MenuItem>

      </NavDropdown>
    );
  }
}

BlockNotificationDropdown.propTypes = {
  eventKey: PropTypes.number.isRequired,
  notifications: PropTypes.array.isRequired
};
