import React, { Component, PropTypes } from 'react';
import '../styles/App.scss';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import messages from '../translations';
import {
  checkAuthStatus,
  signInGoogle,
  authStatusIsUpdated } from '../actions';
import { bindActionCreators } from 'redux';
import WelcomePage from './home/WelcomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = (authResult) => {
      this.props.signInGoogle(authResult['code']);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateAuthStatus) {
      this.props.checkAuthStatus();
      // Set shouldUpdateAuthStatus state to false
      this.props.authStatusIsUpdated();
    }
  }

  componentWillMount() {
    this.props.checkAuthStatus();
  }

  render() {
    const { language, children, isAuthenticated } = this.props;
    let page;
    if (isAuthenticated) {
      page = children;
    } else {
      page = <WelcomePage onSignIn={this.handleSignIn} />
    }
    return (
      <IntlProvider locale={language} messages={messages[language]}>
        {page}
      </IntlProvider>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node,
  checkAuthStatus:  PropTypes.func.isRequired,
  signInGoogle:     PropTypes.func.isRequired,
  isAuthenticated:  PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    errorMessage: state.errorMessage,
    language: state.language.language,
    isAuthenticated:        auth.isAuthenticated,
    shouldUpdateAuthStatus: auth.shouldUpdateAuthStatus
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  checkAuthStatus,
  signInGoogle,
  authStatusIsUpdated
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
