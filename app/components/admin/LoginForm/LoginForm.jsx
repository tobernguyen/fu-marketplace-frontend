import React, { Component, PropTypes } from 'react';
import './LoginForm.scss';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from './LoginForm.i18n.js';

class LoginForm extends Component {
  render() {
    const { fields: {email, password}, handleSubmit, invalid, loginResult, intl: { formatMessage } } = this.props;
    return (
      <div>
        <div className="login-page">
          <div className="container">
            <div className="login-box col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title text-center">FU Marketplace</div>
                </div>
                <div className="panel-body">
                  <form className="form-horizontal" onSubmit={handleSubmit(this.props.signInAdmin.bind(this))}>
                    <div className={`input-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                      <input type="text" className="form-control" placeholder={formatMessage(messages.loginForm.fields.email)} {...email} />
                    </div>
                    <div className="has-error message">
                      <div className="help-block">
                        {email.touched && email.error ? <FormattedMessage {...email.error} /> : ''}
                      </div>
                    </div>
                    <div className={`input-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                      <input type="password" className="form-control" placeholder={formatMessage(messages.loginForm.fields.password)} {...password}/>
                    </div>
                    <div className="has-error message">
                      <div className="help-block">
                        {password.touched && password.error ? <FormattedMessage {...password.error} /> : ''}
                      </div>
                    </div>
                    { loginResult !== '' &&
                      <div className="alert alert-danger">
                        <FormattedMessage {...loginResult}/>
                      </div>
                    }
                    <div className="form-group">
                      <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary btn-login" disabled={invalid}>
                          <i className="glyphicon glyphicon-log-in"/> <FormattedMessage {...messages.loginForm.button.signIn}/>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(LoginForm);
