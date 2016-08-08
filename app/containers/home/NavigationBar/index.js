import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import { withRouter } from 'react-router'
import {
  getNotifications,
  getUnreadCount,
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
      keyword: '',
      wsLoaded: false
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
          const SHOP_OPENING_REQUEST_IS_ACCEPTED = 2;
          if (data.status === SHOP_OPENING_REQUEST_IS_ACCEPTED) {
            this.props.router.push(`/dashboard/shops/${data.shopId}`);
          }
          break;
        }
        case NOTIFICATION_TYPE.USER_PLACE_ORDER:
        {
          this.props.router.push(`/dashboard/shops/${data.shopId}/orders`);
          break;
        }
        case NOTIFICATION_TYPE.USER_TICKET_STATUS_CHANGE:
        {
          this.props.router.push('/tickets');
          break;
        }
        default:
        {
          this.props.router.push('/orders');
        }
      }

      if (read === false) {
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
      const { socket, signOutGoogle } = this.props;
      if (socket) {
        socket.disconnect();
      }
      signOutGoogle();
    }
  }

  render () {
    const { currentUser, handleSearch, displaySearch, notifications, hasMore, clearNotifications, unreadCount, query } = this.props;
    return (
      <Header
        unreadCount={unreadCount}
        query={query}
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
    this.props.getUnreadCount();
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

    if (socket && !this.state.wsLoaded) {
      this.setState({
        wsLoaded: true
      });
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
  getUnreadCount: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  markAllNotificationsAsRead: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser:    getUser(state),
    notifications:  getOwnNotifications(state),
    hasMore:        state.notification.hasMore,
    socket:         state.common.socket,
    unreadCount:    state.notification.unreadCount,
    query:          state.common.query
  }
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  newNotification,
  clearNotifications
})(NavigationBar))
