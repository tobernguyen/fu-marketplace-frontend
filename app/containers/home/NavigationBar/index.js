import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import { getNotifications } from 'app/actions/notification';
import { getUser, getOwnNotifications } from 'app/selectors';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  render () {
    const { currentUser, signOutGoogle, handleSearch, displaySearch, notifications } = this.props;
    return (
      <Header
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

const mapStateToProps = (state) => {
  return {
    currentUser:    getUser(state),
    notifications:  getOwnNotifications(state)
  }
};

export default connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle,
  getNotifications
})(NavigationBar)
