import React, { Component, PropTypes } from 'react';
import './AccountBasic.scss';

export default class AccountBasic extends Component {
  render() {
    return (
      <div className="account-basic">
        <div className="row">
          <div className="col-md-5 user-avatar">
            <img
              src="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/1385457_503108839823558_4450228431036547902_n.jpg?oh=10aed38eb79d7964546aecab6e19df03&oe=57D27A87"
              alt="Hieu Tran"/>
          </div>
          <div className="col-md-7 user-info">
            <div className="header">
              <h3>Do Hai Dong</h3>
              <p>hieutdse02289@fpt.edu.vn</p>
            </div>
            <div className="body">
              <form className="form-horizontal">
                <div className="form-group">
                  <label for="accountFullName" className="col-sm-4 control-label">Full Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="accountFullName" placeholder="Full name" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="accountPhoneNumber" className="col-sm-4 control-label">Phone No.</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="accountPhoneNumber" placeholder="Phone number" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="accountRoomNumber" className="col-sm-4 control-label">Room No.</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="accountRoomNumber" placeholder="Room number" />
                  </div>
                </div>
                <div className="col-sm-offset-4 col-sm-8">
                  <button type="submit" className="btn btn-default">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
