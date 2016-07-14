import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import './BlockNotificationDropdown.scss';
import { FormattedMessage } from 'react-intl';
import BlockNotificationItem from 'app/components/home/BlockNotificationItem';
import { messages } from './BlockNotificationDropdown.i18n';
import _ from 'lodash';
import InfiniteScroll from 'app/components/common/InfiniteScroll';
import { PulseLoader } from 'halogen';


export default class BlockNotificationDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: []
    };

    this.loadMore = this.loadMore.bind(this);

    this.onToggleHandle = (isOpen) => {
      if (!isOpen) {
        this.props.clearNotifications();
        this.setState({
          elements: []
        })
      } else {
        this.props.loadMoreNotifications(1);
      }
    }
  }

  loadMore(page) {
    this.props.loadMoreNotifications(page);
  }

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      if (nextProps.notifications.length > this.state.elements.length) {
        this.setState({
          elements: nextProps.notifications.map((notification, index) =>
            <MenuItem
              key={notification.id}
              eventKey={this.props.eventKey + (index + 1) / 10}
              onClick={() => this.props.onNotificationClick(notification)}>
              <BlockNotificationItem
                notification={notification}/>
            </MenuItem>
          )
        })
      }
    }
  }


  render() {
    const { eventKey, markAsAllRead, hasMoreNotifications } = this.props;
    const title = <div>
      <i className="fa fa-bell fa-lg"/>
      {this.renderNotificationBadge()}
    </div>;
    return (
      <NavDropdown
        eventKey={eventKey}
        title={title}
        className="block-notification-dropdown"
        onToggle={this.onToggleHandle}
        id="notifications-dropdown" noCaret>
        <li className="header clearfix">
          <h4 className="title">
            <FormattedMessage {...messages.notificationTitle} />
          </h4>
          {this.state.elements.length > 0 && <div className="actions">
            <a onClick={markAsAllRead}>
              <FormattedMessage {...messages.markAsRead} />
            </a>
          </div>}
        </li>
        {this.state.elements.length > 0 && <div className="infinite-scroll">
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMore}
            hasMore={hasMoreNotifications}
            loader={<PulseLoader className="feed-loader" color="#C0392B" size="12px" />}
            threshold={1}
            useWindow={false}>
            {this.state.elements}
          </InfiniteScroll>
        </div>}

        {this.state.elements.length === 0 && <li>
          <p className="no-notification">
            <FormattedMessage {...messages.noNotification} />
          </p>
        </li>}
      </NavDropdown>
    );
  }
}

BlockNotificationDropdown.propTypes = {
  eventKey: PropTypes.number.isRequired,
  notifications: PropTypes.array.isRequired,
  onNotificationClick: PropTypes.func.isRequired,
  markAsAllRead: PropTypes.func.isRequired,
  loadMoreNotifications: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired
};
