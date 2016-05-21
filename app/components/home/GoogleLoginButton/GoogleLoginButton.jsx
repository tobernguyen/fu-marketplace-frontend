import React, { PropTypes, Component } from 'react';
import './GoogleLoginButton.scss';


export default class GoogleLoginButton extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { clientId, scope } = this.props;

    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        scope
      };
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init(params);
      });
    });
  }

  onButtonLoginClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.grantOfflineAccess({'redirect_uri': 'postmessage'})
      .then(this.props.callback);
  }

  render() {
    const { cssClass, children } = this.props;
    return (
      <button
        className={cssClass}
        onClick={this.onButtonLoginClick.bind(this)}>
        {children}
      </button>
    );
  }
}

GoogleLoginButton.propTypes = {
  callback:     PropTypes.func.isRequired,
  clientId:     PropTypes.string.isRequired,
  scope:        PropTypes.string,
  cssClass:     PropTypes.string
};

GoogleLoginButton.defaultProps = {
  scope:      'profile email'
};
