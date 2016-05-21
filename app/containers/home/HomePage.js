import React, { Component, PropTypes } from 'react';
import Header from 'app/components/home/Header';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header onSignOut={this.props.onSignOut} />
      </div>
    );
  }
}

HomePage.propTypes = {
  onSignOut: PropTypes.func.isRequired
};
