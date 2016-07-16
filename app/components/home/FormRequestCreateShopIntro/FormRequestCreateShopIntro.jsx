import React, { PropTypes, Component } from 'react';
import './FormRequestCreateShopIntro.scss';


class FormRequestCreateShopIntro extends Component {
  render() {
    const { loaded } = this.props;
    return (
      <div className="form-request-create-shop-intro">
        <div className="action-points">
          <div className="arrow"></div>
          <div className="circle orange">
            <h5>1<br/>
              <span>Đăng ký</span>
            </h5>
            <p>Mở shop bán hàng</p>
          </div>
          <div className="circle green">
            <h5>2<br/>
              <span>Đợi accept</span>
            </h5>
            <p>Phản hồi tối đa trong 24 giờ</p>
          </div>
          <div className="circle yellow">
            <h5>3<br/>
              <span>Bán hàng</span>
            </h5>
            <p>Bắt đầu bán hàng luôn!</p>
          </div>
        </div>
        <button type="submit" disabled={!loaded} className="btn btn-primary" onClick={this.props.nextPage}>
          Đăng ký ngay hôm nay ! {!loaded && <i className="fa fa-spinner fa-spin" />}
        </button>
      </div>
    );
  }
}

FormRequestCreateShopIntro.propTypes = {
  loaded: PropTypes.bool.isRequired
};

export default FormRequestCreateShopIntro;
