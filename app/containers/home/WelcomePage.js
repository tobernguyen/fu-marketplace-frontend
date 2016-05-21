import React, { Component, PropTypes } from 'react';
import Welcome from 'app/components/home/Welcome';

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = (authResult) => {
      this.props.onSignIn(authResult);
    }
  }
  render() {
    return (
      <div>
        <Welcome onSignIn={this.handleSignIn} />
      </div>
    );
  }
}

WelcomePage.propTypes = {
  onSignIn: PropTypes.func.isRequired
};
