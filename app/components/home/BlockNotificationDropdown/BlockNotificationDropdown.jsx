import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import './BlockNotificationDropdown.scss';
import { FormattedMessage } from 'react-intl';
import BlockNotificationItem from 'app/components/home/BlockNotificationItem';
import { messages } from './BlockNotificationDropdown.i18n';
import _ from 'lodash';

export default class BlockNotificationDropdown extends Component {

  renderNotificationBadge() {
    const notificationCount = _.size(_.filter(this.props.notifications, (item) =>
      item.read !== true
    ));

    return (
      <div>
        {notificationCount > 0 && <span className="badge">
          {notificationCount}
        </span>}
      </div>
    )
  }

  render() {
    const { eventKey, notifications } = this.props;
    const title = <div>
      <i className="fa fa-bell fa-lg"/>
      {this.renderNotificationBadge()}
    </div>;
    return (
      <NavDropdown
        eventKey={eventKey}
        title={title}
        className="block-notification-dropdown"
        id="notifications-dropdown" noCaret>
        <li className="header clearfix">
          <h4 className="title">
            <FormattedMessage {...messages.notificationTitle} />
          </h4>
          <div className="actions">
            <a href="#">
              <FormattedMessage {...messages.markAsRead} />
            </a>
          </div>
        </li>
        {notifications.map((notification, index) =>
          <BlockNotificationItem key={index} eventKey={eventKey} notification={notification}/>
        )}
        <MenuItem eventKey={3.3} className="footer">
          <FormattedMessage {...messages.seeAll} />
        </MenuItem>
      </NavDropdown>
    );
  }
}

BlockNotificationDropdown.propTypes = {
  eventKey: PropTypes.number.isRequired,
  notifications: PropTypes.array.isRequired
};
