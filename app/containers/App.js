import React, { Component, PropTypes } from 'react';
import '../styles/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
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
  // Injected by React Router
  children: PropTypes.node
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage
});

export default App
