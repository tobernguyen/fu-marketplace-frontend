import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { fields } from 'app/shared/fields';
import './BlockShopOpeningPendingRequests.scss';

export default class BlockShopOpeningPendingRequests extends Component {
  render() {
    return (
      <div className="block-shop-opening-pending-requests">
        <h4 className="page-header">Yêu cầu mở shop đang chờ đồng ý</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
            <tr>
              <th>#</th>
              <th>
                <FormattedMessage {...fields.shopName} />
              </th>
              <th>
                <FormattedMessage {...fields.shopDescription} />
              </th>
              <th>
                <FormattedMessage {...fields.note} />
              </th>
              <th>
                <FormattedMessage {...fields.adminMessage} />
              </th>
            </tr>
            </thead>
            <tbody>
            {this.props.shopOpeningRequests.map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.note}</td>
                  <td>{item.adminMessage || ''}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

BlockShopOpeningPendingRequests.propTypes = {
  shopOpeningRequests: PropTypes.array.isRequired
};
