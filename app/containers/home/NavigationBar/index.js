import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import { getUser } from 'app/selectors';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  render () {
    const { currentUser, signOutGoogle, handleSearch, displaySearch } = this.props;
    return (
      <Header
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
    currentUser:  getUser(state)
  }
};

export default connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle
})(NavigationBar)
