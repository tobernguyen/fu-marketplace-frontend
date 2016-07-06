import React, { Component, PropTypes } from 'react';
import OneSignal from 'onesignal';
import './BlockEnablePushSuggestion.scss';

export default class BlockEnablePushSuggestion extends Component {
  constructor(props) {
    super(props);
    this.enableNow = () => {
      OneSignal.push(["registerForPushNotifications"]);
    }
  }
  render() {
    const { pushNotificationEnabled, oneSignalRegistered, sellerMode } = this.props;
    const message = sellerMode ? 'Bạn có thể nhận thông báo mỗi khi có order mới hoặc order bị thay đổi trạng thái từ phía khách hàng của mình theo thời gian thực bằng cách bật tính năng Gửi thông báo qua trình duyệt.' : 'Bạn có thể nhận thông tin về đơn hàng của mình đã được xử lý/ship hay chưa theo thời gian thực bằng cách bật tính năng Gửi thông báo qua trình duyệt.';
    return (
      <div className="block-enable-push-suggestion">
        {!pushNotificationEnabled && <div className="alert alert-warning">
          {message}
          <div className="clearfix">
            <a onClick={this.enableNow} className="accept">Quá tuyệt. Bật ngay!</a>
          </div>
        </div>}
        {oneSignalRegistered && <div className="alert alert-info">
          Bạn đã đăng ký nhận thông báo qua trình duyệt thành công!
        </div>}
      </div>
    );
  }
}

BlockEnablePushSuggestion.propTypes = {
  oneSignalRegistered: PropTypes.bool.isRequired,
  pushNotificationEnabled: PropTypes.bool.isRequired
};
