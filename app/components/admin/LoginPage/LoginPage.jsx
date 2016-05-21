import React, { Component, PropTypes } from 'react';
import './LoginPage.scss';


export default class LoginPage extends Component {
  componentWillMount() {
    document.body.classList.add('admin-page');
  }

  componentWillUnmount() {
    document.body.classList.add('admin-page');
  }

  render() {
    return (
      <div>
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="login-page">
          <div className="container">
            <div className="login-box col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title text-center">FU Marketplace</div>
                </div>
                <div className="panel-body">
                  <form name="form" id="form" className="form-horizontal" enctype="multipart/form-data" method="POST">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                      <input id="user" type="text" className="form-control" name="user" value="" placeholder="User"/>
                    </div>

                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                      <input id="password" type="password" className="form-control" name="password" placeholder="Password"/>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12">
                        <button type="submit" href="#" className="btn btn-primary btn-login"><i className="glyphicon glyphicon-log-in"></i> Log in</button>
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
