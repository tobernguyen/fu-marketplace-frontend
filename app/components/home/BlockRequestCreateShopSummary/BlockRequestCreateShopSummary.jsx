import React, { Component, PropTypes } from 'react';
import './BlockRequestCreateShopSummary.scss';

export default class BlockRequestCreateShopSummary extends Component {
  render() {
    return (
      <div className="block-request-create-shop-summary">
        <h4 className="page-header">
          Đăng ký tạo shop thành công với thông tin dưới đây:
        </h4>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Thông tin người bán</h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>
                Phone: 0973658655
              </li>
              <li>
                Identity number: 123012939
              </li>
            </ul>
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Thông tin shop</h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>
                Tên shop: Bánh mỳ C-Bakery
              </li>
              <li>
                Miêu tả: Bánh mỳ
              </li>
              <li>
                Địa chỉ: C302 - Ki ốt số 9
              </li>
              <li>
                Miêu tả: Bánh mỳ đểu
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

BlockRequestCreateShopSummary.propTypes = {
  requestSummary: PropTypes.object.isRequired
};
