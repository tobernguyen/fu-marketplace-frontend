import React, { Component } from 'react';
import Welcome from 'app/components/home/Welcome';
import { signInGoogle } from 'app/actions';
import { connect } from 'react-redux';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = (authResult) => {
      this.props.signInGoogle(authResult);
    }
  }
  render() {
    return (
      <div>
        <Welcome
          error={this.props.error}
          onSignIn={this.handleSignIn}
          authenticating={this.props.authenticating} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    error: auth.error,
    authenticating: auth.authenticating
  }
};


export default connect(mapStateToProps, {
  signInGoogle
})(WelcomePage)
