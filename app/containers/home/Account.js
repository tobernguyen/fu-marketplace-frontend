import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import AccountBasic from 'app/components/home/AccountBasic';

class Account extends Component {
  render() {
    return (
      <div>
        <ModalHeader title="Account" subHeader="Change your basic account." />
        <div className="modal-body">
          <AccountBasic />
        </div>
      </div>
    );
  }
}

export default Account;
