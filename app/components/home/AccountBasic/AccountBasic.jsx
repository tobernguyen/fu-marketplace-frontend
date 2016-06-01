import React, { Component, PropTypes } from 'react';
import './AccountBasic.scss';

export default class AccountBasic extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className="account-basic">
        <div className="row">
          <div className="col-md-5 user-avatar">
            <img
              src={currentUser.avatar}
              alt={`Hình đại diện của ${currentUser.fullName}`}
              title={`Hình đại diện của ${currentUser.fullName}`} />
          </div>
          <div className="col-md-7 user-info">
            <div className="header">
              <h3>{currentUser.fullName}</h3>
              <p>{currentUser.email}</p>
            </div>
            <div className="body">
              <form className="form-horizontal">
                <div className="form-group">
                  <label for="accountPhoneNumber" className="col-sm-4 control-label">Điện thoại</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="accountPhoneNumber" placeholder="Số điện thoại" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="accountRoomNumber" className="col-sm-4 control-label">Phòng KTX</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="accountRoomNumber" placeholder="Số phòng KTX" />
                  </div>
                </div>
                <div className="col-sm-offset-4 col-sm-8">
                  <button type="submit" className="btn btn-default">Lưu thông tin</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AccountBasic.propTypes = {
  currentUser: PropTypes.object.isRequired
};

AccountBasic.defaultProps = {
  currentUser: {
    fullName: '',
    email: '',
    avatar: '',
    gender: '',
    phone: '',
    room: ''
  }
};
