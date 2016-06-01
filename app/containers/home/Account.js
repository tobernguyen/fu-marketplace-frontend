import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import AccountBasic from 'app/components/home/AccountBasic';
import { connect } from 'react-redux';

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ModalHeader title="Tài khoản" subHeader="Thay đổi thông tin cơ bản."/>
        <div className="modal-body">
          <AccountBasic currentUser={this.props.currentUser} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { user } = state;
  return {
    currentUser: user.currentUser
  }
};

export default connect(mapStateToProps, {

})(Account)
