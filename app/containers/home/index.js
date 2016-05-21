import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuthStatus, signInGoogle } from '../../actions';
import HomePage from './HomePage';
import WelcomePage from './WelcomePage';


class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = (authResult) => {
      this.props.signInGoogle(authResult['code']);
    }
  }

  componentWillMount() {
    this.props.checkAuthStatus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.props.checkAuthStatus();
    }
  }

  render() {
    var page;
    
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      page = <HomePage />
    } else {
      page = <WelcomePage onSignIn={this.handleSignIn} />
    }

    return (
      <div>{page}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:  state.authenticate.isAuthenticated,
    userId:           state.authenticate.userId
  }
};

Home.propTypes = {
  checkAuthStatus:  PropTypes.func.isRequired,
  signInGoogle:     PropTypes.func.isRequired,
  isAuthenticated:  PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {
  checkAuthStatus,
  signInGoogle
})(Home)
