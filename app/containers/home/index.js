import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuthStatus, signInGoogle, signOutGoogle, authStatusIsUpdated } from '../../actions';
import HomePage from './HomePage';
import WelcomePage from './WelcomePage';
import { bindActionCreators } from 'redux';


class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = (authResult) => {
      this.props.signInGoogle(authResult['code']);
    };
    this.handleSignOut = () => {
      this.props.signOutGoogle();
    };
  }

  componentWillMount() {
    this.props.checkAuthStatus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateAuthStatus) {
      this.props.checkAuthStatus();
      // Set shouldUpdateAuthStatus state to false
      this.props.authStatusIsUpdated();
    }
  }

  render() {
    var page;

    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      page = <HomePage onSignOut={this.handleSignOut} />
    } else {
      page = <WelcomePage onSignIn={this.handleSignIn} />
    }

    return (
      <div>{page}</div>
    );
  }
}

Home.propTypes = {
  checkAuthStatus:  PropTypes.func.isRequired,
  signInGoogle:     PropTypes.func.isRequired,
  signOutGoogle:    PropTypes.func.isRequired,
  isAuthenticated:  PropTypes.bool.isRequired
};


const mapStateToProps = (state) => {
  return {
    isAuthenticated:        state.auth.isAuthenticated,
    shouldUpdateAuthStatus: state.auth.shouldUpdateAuthStatus
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  checkAuthStatus,
  signInGoogle,
  signOutGoogle,
  authStatusIsUpdated
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home)
