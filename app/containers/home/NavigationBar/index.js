import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  newNotification
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
      this.props.markNotificationAsRead(notification.data.id);
    };

    this.markAsAllRead = () => {
      this.props.markAllNotificationsAsRead();
    }
  }

  render () {
    const { currentUser, signOutGoogle, handleSearch, displaySearch, notifications } = this.props;
    console.log(notifications);
    return (
      <Header
        onNotificationClick={this.onNotificationClick}
        markAsAllRead={this.markAsAllRead}
        notifications={notifications}
        displaySearch={displaySearch}
        currentUser={currentUser}
        onSignOut={signOutGoogle}
        handleSearch={handleSearch}
        keyword={this.state.keyword}/>
    );
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.props.getNotifications();
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on(EVENTS.NEW_NOTIFICATION, (notification) => {
      this.props.newNotification(notification);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps;
    let keyword = '';
    if (query && query.hasOwnProperty('keyword')) {
      keyword = query['keyword']
    }
    if (this.state.keyword !== keyword) {
      this.setState({
        keyword: keyword
      })
    }
  }
}

NavigationBar.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  signOutGoogle: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  markAllNotificationsAsRead: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser:    getUser(state),
    notifications:  getOwnNotifications(state)
  }
};

export default connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  newNotification
})(NavigationBar)
