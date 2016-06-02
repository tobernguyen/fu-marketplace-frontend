import React, { Component, PropTypes } from 'react';
import '../styles/App.scss';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import messages from '../translations';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { language, children } = this.props;
    return (
      <IntlProvider locale={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    errorMessage: state.errorMessage,
    language: state.language.language
  }
};

export default connect(mapStateToProps)(App);
