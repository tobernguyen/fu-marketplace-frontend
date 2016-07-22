import React, { Component, PropTypes } from 'react';
import './Welcome.scss';
import { Carousel } from 'react-bootstrap';
import GoogleLoginButton from '../GoogleLoginButton';
import { googleClientID } from 'app/config';
import { FormattedMessage } from 'react-intl';


export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.signInCallback = (authResult) => {
      this.props.onSignIn(authResult)
    };
  }

  render() {
    const { authenticating } = this.props;
    return <div className="slideshow">
      <Carousel controls={false}>
        <Carousel.Item>
          <img className="img-responsive" src={require('app/images/slideshow_1.jpg')}/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="img-responsive" src={require('app/images/slideshow_2.jpg')}/>
        </Carousel.Item>
      </Carousel>
      <div className="intro">
        <div className="text-center">
          <h1>Welcome to Hoa Lac Marketplace</h1>
          <GoogleLoginButton
            cssClass="btn btn-primary btn-google-sign-in"
            clientId={googleClientID}
            authenticating={authenticating}
            callback={this.signInCallback}>
            <i className="fa fa-google-plus"/>
            Sign in with Google {authenticating && <i className="fa fa-spin fa-spinner"/>}
          </GoogleLoginButton>
        </div>
      </div>
      {this.props.error && <div className="error-message">
        <h4>
          <FormattedMessage
            id={this.props.error}
            defaultMessage='Authentication failed' />
        </h4>
      </div>}
    </div>;
  }
}

Welcome.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  authenticating: PropTypes.bool.isRequired
};
