import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import { withRouter } from 'react-router'
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  newNotification,
  clearNotifications
} from 'app/actions/notification';
import { getUser, getOwnNotifications } from 'app/selectors';
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
        case 2:
        {
          this.props.router.push(`/dashboard/shops/${data.id}`);
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
    }
  }

  render () {
    const { currentUser, signOutGoogle, handleSearch, displaySearch, notifications, hasMore, clearNotifications } = this.props;
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
        onSignOut={signOutGoogle}
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
  clearNotifications
})(NavigationBar))
