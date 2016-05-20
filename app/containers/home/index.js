import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuthStatus } from '../../actions';
import HomePage from './HomePage';
import WelcomePage from './WelcomePage';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const token = window.localStorage.getItem("token");
    this.props.checkAuthStatus(token);
  }

  render() {
    var page;
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      page = <HomePage />
    } else {
      page = <WelcomePage />
    }

    return (
      <div>{page}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated
});

Home.propTypes = {
  checkAuthStatus: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {
  checkAuthStatus
})(Home)
