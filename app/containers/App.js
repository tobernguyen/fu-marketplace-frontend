import React, { Component, PropTypes } from 'react';
import '../styles/App.scss';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import messages from '../translations';
import {
  checkAuthStatus,
  authStatusIsUpdated } from '../actions';
import { bindActionCreators } from 'redux';
import WelcomePage from './home/WelcomePage';

const ADMIN_PATH = '/admin';

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
      this.props.authStatusIsUpdated();
    }
  }

  componentWillMount() {
    this.props.checkAuthStatus();
  }

  render() {

    const { language, children, isAuthenticated, location: { pathname } } = this.props;
    if (isAuthenticated === null) {
      return (
        <div>
          Initializing
        </div>
      )
    }

    let inAdminPath = false;
    if (pathname && pathname.substring(0, ADMIN_PATH.length) === ADMIN_PATH) {
      inAdminPath = true;
    }
    let page;
    if (isAuthenticated || inAdminPath) {
      page = children;
    } else {
      page = <WelcomePage />
    }
    return (
      <IntlProvider locale={language} messages={messages[language]}>
        {page}
      </IntlProvider>
    );
  }
}

App.propTypes = {
  errorMessage: PropTypes.string, // Injected by React Redux
  children: PropTypes.node, // Injected by React Router
  checkAuthStatus:  PropTypes.func.isRequired,
  isAuthenticated:  PropTypes.bool
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
  authStatusIsUpdated
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
