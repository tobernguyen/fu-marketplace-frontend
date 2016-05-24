import React, { Component, PropTypes } from 'react';
import UserManagementRow from 'app/components/admin/UserManagementRow';

import './UserManagement.scss';

const fakeData = [
  {
    "fullname": "Long Nguyen",
    "avatar": null,
    "room": null,
    "phone": null,
    "banStatus": null,
    "realm": null,
    "username": "tobernguyen",
    "challenges": null,
    "email": "longnh1994@gmail.com",
    "emailVerified": null,
    "status": null,
    "created": null,
    "lastUpdated": null,
    "id": 1,
    "credentials": null
  },

  {
    "fullname": "Dong Do",
    "avatar": null,
    "room": "C203",
    "phone": "01647736994",
    "banStatus": false,
    "realm": null,
    "username": "dongdeptrai",
    "challenges": null,
    "email": "haidongdo1994@gmail.com",
    "emailVerified": true,
    "status": "Cool",
    "created": null,
    "lastUpdated": null,
    "id": 2,
    "credentials": null
  },

  {
    "fullname": "Hieu Tran",
    "avatar": null,
    "room": "C305",
    "phone": "100123012",
    "banStatus": true,
    "realm": null,
    "username": "hieudiemdam",
    "challenges": null,
    "email": "hieutd1993@gmail.com",
    "emailVerified": true,
    "status": "Not so Cool",
    "created": null,
    "lastUpdated": null,
    "id": 3,
    "credentials": null
  },

  {
    "fullname": "Son Hoang",
    "avatar": null,
    "room": "D201",
    "phone": "01234567890",
    "banStatus": true,
    "realm": null,
    "username": "sondeptrai",
    "challenges": null,
    "email": "sonht1994@gmail.com",
    "emailVerified": true,
    "status": "Sick",
    "created": null,
    "lastUpdated": null,
    "id": 4,
    "credentials": null
  },

  {
    "fullname": "Son Trieu",
    "avatar": null,
    "room": "C203",
    "phone": "000000000",
    "banStatus": false,
    "realm": null,
    "username": "sonngaucut",
    "challenges": null,
    "email": "sontc@gmail.com",
    "emailVerified": true,
    "status": "Not so Cool",
    "created": null,
    "lastUpdated": null,
    "id": 5,
    "credentials": null
  }
]


export default class UserManagement extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>User Name</td>
            <td>Email</td>
            <td>Full Name</td>
            <td>Room</td>
            <td>Phone</td>
            <td>Ban Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {fakeData.map(user =>
            <UserManagementRow key={user.id} user={user} />
          )}
        </tbody>
      </table>
    );
  }
}
