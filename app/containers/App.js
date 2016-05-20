import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetErrorMessage } from '../actions';
import { browserHistory } from 'react-router';
import '../styles/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault()
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage
});

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
