import React, { Component, PropTypes } from 'react';
import OneSignal from 'onesignal';
import './BlockEnablePushSuggestion.scss';
import { FormattedMessage } from 'react-intl';
import { messages } from './BlockEnablePushSuggestion.i18n';

export default class BlockEnablePushSuggestion extends Component {
  constructor(props) {
    super(props);
    this.enableNow = () => {
      OneSignal.push(["registerForPushNotifications"]);
    }
  }
  render() {
    const { pushNotificationEnabled, oneSignalRegistered, sellerMode } = this.props;
    const message = sellerMode ? <FormattedMessage {...messages.seller}/> : <FormattedMessage {...messages.buyer}/>;
    return (
      <div className="block-enable-push-suggestion">
        {!pushNotificationEnabled && <div className="alert alert-warning">
          {message}
          <div className="clearfix">
            <a onClick={this.enableNow} className="accept"><FormattedMessage {...messages.enable}/></a>
          </div>
        </div>}
        {oneSignalRegistered && <div className="alert alert-info">
        <FormattedMessage {...messages.success}/>
        </div>}
      </div>
    );
  }
}

BlockEnablePushSuggestion.propTypes = {
  oneSignalRegistered: PropTypes.bool.isRequired,
  pushNotificationEnabled: PropTypes.bool.isRequired
};
