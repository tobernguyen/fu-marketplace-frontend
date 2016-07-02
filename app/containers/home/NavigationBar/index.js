import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import { getUser } from 'app/selectors';

class NavigationBar extends Component {
  render () {
    const { currentUser, signOutGoogle } = this.props;
    return (
      <Header currentUser={currentUser} onSignOut={signOutGoogle} />
    );
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser:  getUser(state)
  }
};

export default connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle
})(NavigationBar)
