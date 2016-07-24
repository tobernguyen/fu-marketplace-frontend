import React, { Component, PropTypes } from 'react';
import { FormattedRelative, FormattedHTMLMessage } from 'react-intl';
import { messages } from './BlockNotificationItem.i18n';
import './BlockNotificationItem.scss';
import { NOTIFICATION_TYPE, ORDER_STATUS, TICKET_STATUS } from './notificationTypes';
import classNames from 'classnames';

export default class BlockNotificationItem extends Component {
  constructor(props) {
    super(props);
  }

  renderNotificationTitle() {
    const { notification: { type, data } } = this.props;
    switch (type) {
      case NOTIFICATION_TYPE.OPEN_SHOP_REQUEST_CHANGE:
      {
        switch (data.status) {
          case 1: // Rejected
          {
            const values = {
              name: data.name,
              adminMessage: data.adminMessage
            };
            return <FormattedHTMLMessage values={values} {...messages.shopOpeningRequest.rejected} />;
          }
          case 2: // Accepted
          {
            const values = {
              name: data.name
            };
            return <FormattedHTMLMessage values={values} {...messages.shopOpeningRequest.accepted} />;
          }
          default:
            break;
        }
        break;
      }
      case NOTIFICATION_TYPE.SELLER_CHANGE_ORDER_STATUS:
      {
        switch (data.newStatus) {
          case ORDER_STATUS.ACCEPTED:
          {
            const values = {
              orderId: data.orderId,
              shopName: data.shopName
            };
            return <FormattedHTMLMessage values={values} {...messages.orderStatus.accepted} />;
          }
          case ORDER_STATUS.REJECTED:
          {
            const values = {
              orderId: data.orderId,
              shopName: data.shopName,
              sellerMessage: data.sellerMessage
            };
            return <FormattedHTMLMessage values={values} {...messages.orderStatus.rejected} />;
          }
          case ORDER_STATUS.SHIPPING:
          {
            const values = {
              orderId: data.orderId,
              shopName: data.shopName
            };
            return <FormattedHTMLMessage values={values} {...messages.orderStatus.shipping} />;
          }
          case ORDER_STATUS.COMPLETED:
          {
            const values = {
              shopName: data.shopName
            };
            return <FormattedHTMLMessage values={values} {...messages.orderStatus.completed} />;
          }
          case ORDER_STATUS.ABORTED:
          {
            const values = {
              orderId: data.orderId,
              shopName: data.shopName,
              sellerMessage: data.sellerMessage
            };
            return <FormattedHTMLMessage values={values} {...messages.orderStatus.aborted} />;
          }
        }
        break;
      }
      case NOTIFICATION_TYPE.USER_PLACE_ORDER:
      {
        const values = {
          shopName: data.shopName,
          orderId: data.orderId,
          buyerName: data.buyerName
        };
        return <FormattedHTMLMessage values={values} {...messages.order.userPlaceOrder} />;
      }
      case NOTIFICATION_TYPE.USER_CANCEL_ORDER:
      {
        const values = {
          orderId: data.orderId
        };
        return <FormattedHTMLMessage values={values} {...messages.order.userCancelOrder} />;
      }
      case NOTIFICATION_TYPE.USER_TICKET_STATUS_CHANGE:
      {
        const values = {
          orderId: data.orderId,
          shopName: data.shopName
        };
        switch (data.newStatus) {
          case TICKET_STATUS.OPENING:
          {
            return <FormattedHTMLMessage values={values} {...messages.ticketStatus.opening} />;
          }
          case TICKET_STATUS.INVESTIGATING:
          {
            return <FormattedHTMLMessage values={values} {...messages.ticketStatus.investigating} />;
          }
          case TICKET_STATUS.CLOSED:
          {
            return <FormattedHTMLMessage values={values} {...messages.ticketStatus.closed} />;
          }
        }
      }
    }
    return <span />
  }

  renderNotificationImage() {
    const { notification: { type, data } } = this.props;
    let image;
    switch (type) {
      case NOTIFICATION_TYPE.SELLER_CHANGE_ORDER_STATUS:
        image = data.shopAvatar;
        break;
      case NOTIFICATION_TYPE.USER_PLACE_ORDER:
      case NOTIFICATION_TYPE.USER_CANCEL_ORDER:
        image = data.buyerAvatar;
        break;
    }

    return <img src={image} />
  }


  render() {
    const { notification: { createdAt, read } } = this.props;
    const notificationTime = new Date(createdAt);
    return (
      <div className={classNames('block-notification-item', 'clearfix', { read: read })}>
        <div className="pull-left buyer-avatar">
          {this.renderNotificationImage()}
        </div>
        <div className="content">
          {this.renderNotificationTitle()}
          <p>
            <FormattedRelative value={notificationTime}/>
          </p>
        </div>
      </div>
    )
  }
}
