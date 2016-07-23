import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import { destroyWebSocket } from 'app/actions/common';
import { withRouter } from 'react-router'
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  newNotification,
  clearNotifications
} from 'app/actions/notification';
import { getUser, getOwnNotifications } from 'app/selectors';
import { ORDER_STATUS, NOTIFICATION_TYPE } from 'app/shared/notificationMessages';
import { EVENTS } from 'app/shared/socketIOEvents';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };

    this.onNotificationClick = (notification) => {
      const { id, type, read, data } = notification;
      switch (type) {
        case NOTIFICATION_TYPE.SELLER_CHANGE_ORDER_STATUS:
        {
          if (data.newStatus === ORDER_STATUS.COMPLETED) {
            this.props.router.push(`/shops/${data.shopId}/reviews`);
          } else {
            this.props.router.push('/orders');
          }
          break;
        }
        case NOTIFICATION_TYPE.OPEN_SHOP_REQUEST_CHANGE:
        {
          this.props.router.push(`/dashboard/shops/${data.id}`);
          break;
        }
        case NOTIFICATION_TYPE.USER_PLACE_ORDER:
        {
          this.props.router.push(`/dashboard/shops/${data.shopId}/orders`);
          break;
        }
        default:
        {
          this.props.router.push('/orders');
        }
      }

      if (!read) {
        this.props.markNotificationAsRead(id);
      }
    };

    this.markAsAllRead = () => {
      this.props.markAllNotificationsAsRead();
    };

    this.loadMoreNotifications = (page) => {
      this.props.getNotifications(page);
    };

    this.handleSignOutGoogle = () => {
      const { socket, signOutGoogle, destroyWebSocket } = this.props;
      if (socket) {
        socket.disconnect();
        destroyWebSocket();
      }
      signOutGoogle();
    }
  }

  render () {
    const { currentUser, handleSearch, displaySearch, notifications, hasMore, clearNotifications } = this.props;
    return (
      <Header
        clearNotifications={clearNotifications}
        loadMoreNotifications={this.loadMoreNotifications}
        onNotificationClick={this.onNotificationClick}
        markAsAllRead={this.markAsAllRead}
        notifications={notifications}
        hasMoreNotifications={hasMore}
        displaySearch={displaySearch}
        currentUser={currentUser}
        onSignOut={this.handleSignOutGoogle}
        handleSearch={handleSearch}
        keyword={this.state.keyword}/>
    );
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const { query, socket } = nextProps;
    let keyword = '';
    if (query && query.hasOwnProperty('keyword')) {
      keyword = query['keyword']
    }
    if (this.state.keyword !== keyword) {
      this.setState({
        keyword: keyword
      })
    }

    if (socket) {
      socket.on(EVENTS.NEW_NOTIFICATION, (notification) => {
        this.props.newNotification(notification);
      });
    }
  }
}

NavigationBar.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  signOutGoogle: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  markAllNotificationsAsRead: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser:            getUser(state),
    notifications:          getOwnNotifications(state),
    hasMore:                state.notification.hasMore,
    socket:                 state.common.socket
  }
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  newNotification,
  clearNotifications,
  destroyWebSocket
})(NavigationBar))
