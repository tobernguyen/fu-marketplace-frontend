import React, { Component, PropTypes } from 'react';
import './Welcome.scss';
import { Carousel } from 'react-bootstrap';
import GoogleLoginButton from '../GoogleLoginButton';
import FormRequestCreateShopIntro from '../FormRequestCreateShopIntro';
import { googleClientID } from 'app/config';
import { FormattedMessage } from 'react-intl';


export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.signInCallback = (authResult) => {
      this.props.onSignIn(authResult)
    };
  }

  render() {
    const { authenticating } = this.props;
    return <div className="welcome">
      <div className="slideshow">
        <span className="mask-overlay" />
        <Carousel controls={false}>
          <Carousel.Item>
            <img className="img-responsive" src={require('app/images/slideshow_1.jpg')}/>
          </Carousel.Item>
          <Carousel.Item>
            <img className="img-responsive" src={require('app/images/slideshow_2.jpg')}/>
          </Carousel.Item>
        </Carousel>
        <div className="intro">
          <div className="text-center">
            <div className="logo-wrapper animated bounceIn">
              <h1 className="logo-image"/>
            </div>
            <GoogleLoginButton
              cssClass="btn btn-primary btn-google-sign-in"
              clientId={googleClientID}
              authenticating={authenticating}
              callback={this.signInCallback}>
              <i className="fa google fa-google-plus"/>
              Đăng nhập với Google {authenticating && <i className="fa fa-spin fa-spinner"/>}
            </GoogleLoginButton>
          </div>
        </div>
        {this.props.error && <div className="error-message">
          <h4>
            <FormattedMessage
              id={this.props.error}
              defaultMessage='Authentication failed' />
          </h4>
        </div>}
      </div>
      <div className="user-benefits section clearfix">
        <div className="container">
          <div className="header">
            <h3 className="title">Dễ dàng mua hàng hơn!</h3>
          </div>
          <div className="body row">
            <div className="col-sm-12">
              <div className="col-sm-6">
                <div className="clearfix feature">
                  <div className="col-sm-2 icon">
                    <i className="fa fa-search fa-5x"/>
                  </div>
                  <div className="col-sm-10 content">
                    <h4>Tìm kiếm sản phẩm</h4>
                    <p>
                      Hỗ trợ tìm kiếm sản phẩm theo thể loại, nơi ship tới và tất nhiên là cả tên sản phẩm, tên shop.
                    </p>
                  </div>
                </div>

                <div className="clearfix feature">
                  <div className="col-sm-2 icon">
                    <i className="fa fa-comments fa-5x"/>
                  </div>
                  <div className="col-sm-10 content">
                    <h4>Khiếu nại về cửa hàng</h4>
                    <p>
                      Bạn có thể khiếu nại về chất lượng sản phẩm, dịch vụ hoặc về một đơn hàng nào đó bất kỳ lúc nào.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="clearfix feature">
                  <div className="col-sm-2 icon">
                    <i className="fa fa-bars fa-5x"/>
                  </div>
                  <div className="col-sm-10 content">
                    <h4>Thông tin đơn hàng</h4>
                    <p>
                      Nhận thông tin về trạng thái đơn hàng theo thời gian thực qua hệ thống thông báo của trình duyệt và ngay trên trang web.
                    </p>
                  </div>
                </div>

                <div className="clearfix feature">
                  <div className="col-sm-2 icon">
                    <i className="fa fa-star fa-5x"/>
                  </div>
                  <div className="col-sm-10 content">
                    <h4>Đánh giá của shop</h4>
                    <p>
                      Bạn có thể đánh giá hoặc xem thông tin đánh giá khách quan về shop từ những người dùng khác.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="seller-benefits section clearfix">
        <div className="container">
          <div className="header">
            <h3 className="title">Bạn muốn bán hàng? Đăng ký chỉ với 3 bước!</h3>
          </div>
          <div className="body row">
            <div className="col-md-6 col-md-offset-3">
              <FormRequestCreateShopIntro intro={true} />
            </div>
          </div>

          <div className="header">
            <h3 className="title additional-feature">Những tính năng hỗ trợ bán hàng</h3>
          </div>
          <div className="body additional-features row">
            <div className="col-md-6 col-md-offset-3">

              <div className="clearfix feature">
                <div className="col-sm-2 icon">
                  <i className="fa fa-bell fa-5x"/>
                </div>
                <div className="col-sm-10 content">
                  <h4>Nhận đơn hàng nhanh chóng</h4>
                  <p>
                    Nhận đơn hàng nhanh chóng theo thời gian thực.
                  </p>
                </div>
              </div>

              <div className="clearfix feature">
                <div className="col-sm-2 icon">
                  <i className="fa fa-pie-chart fa-5x"/>
                </div>
                <div className="col-sm-10 content">
                  <h4>Xem thống kê bán hàng</h4>
                  <p>
                    Kiểm soát doanh thu bán hàng, thông kê những sản phẩm bán chạy để đưa ra chiến lược kinh doanh phù hợp.
                  </p>
                </div>
              </div>

              <div className="clearfix feature">
                <div className="col-sm-2 icon">
                  <i className="fa fa-bars fa-5x"/>
                </div>
                <div className="col-sm-10 content">
                  <h4>Quản lý sản phẩm dễ dàng</h4>
                  <p>
                    Dễ dàng quản lý, cập nhật tình trạng còn hết, số lượng sản phẩm một cách nhanh chóng theo thời gian thực.
                  </p>
                </div>
              </div>

              <div className="clearfix feature">
                <div className="col-sm-2 icon">
                  <i className="fa fa-comments fa-5x"/>
                </div>
                <div className="col-sm-10 content">
                  <h4>Nhận ý kiến đóng góp từ khách hàng</h4>
                  <p>
                    Nhận ý kiến đóng góp từ khách hàng để nâng cao chất lượng dịch vụ.
                  </p>
                </div>
              </div>

              <div className="clearfix feature">
                <div className="col-sm-2 icon">
                  <i className="fa fa-tachometer fa-5x"/>
                </div>
                <div className="col-sm-10 content">
                  <h4>Quản lý shop hiệu quả</h4>
                  <p>
                    Cùng một tài khoản có thể tạo được nhiều shop và dễ dàng cập nhật thông tin shop.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="footer clearfix">
        <p>
          Copyright 2016 &copy; ProIS
        </p>
      </div>
    </div>;
  }
}



Welcome.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  authenticating: PropTypes.bool.isRequired
};
