import React, { Component, PropTypes } from 'react';
import Welcome from 'app/components/home/Welcome';
import { connect } from 'react-redux';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = (authResult) => {
      this.props.onSignIn(authResult);
    }
  }
  render() {
    return (
      <div>
        <Welcome error={this.props.error} onSignIn={this.handleSignIn} />
      </div>
    );
  }
}

WelcomePage.propTypes = {
  onSignIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    error: auth.error
  }
};


export default connect(mapStateToProps)(WelcomePage)
