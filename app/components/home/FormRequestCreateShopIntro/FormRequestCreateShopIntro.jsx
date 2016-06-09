import React, { PropTypes, Component } from 'react';
import './FormRequestCreateShopIntro.scss';


class FormRequestCreateShopIntro extends Component {
  render() {
    return (
      <div className="form-request-create-shop-intro">
        <div className="action-points">
          <div className="arrow"></div>
          <div className="circle orange">
            <h5>1<br/>
              <span>Đăng ký</span>
            </h5>
            <p>Register</p>
          </div>
          <div className="circle green">
            <h5>2<br/>
              <span>Đợi accept</span>
            </h5>
            <p>Register</p>
          </div>
          <div className="circle yellow">
            <h5>3<br/>
              <span>Bán hàng</span>
            </h5>
            <p>Register</p>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Next <i className="fa fa-chevron-right"/>
        </button>
      </div>
    );
  }
}

export default FormRequestCreateShopIntro;
