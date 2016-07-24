import React from 'react';
import { FormattedMessage, FormattedDate, FormattedTime, FormattedNumber } from 'react-intl';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import { messages } from 'app/components/admin/FormChangeTicketStatus/FormChangeTicketStatus.i18n';

const OrderInformationSection = ({ orderId, order }) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <h4>
          <strong>
            <FormattedMessage {...messages.formChangeTicketStatus.orderSection.sectionName} />
          </strong>
        </h4>
        <p>
          <FormattedMessage {...messages.formChangeTicketStatus.orderSection.sectionDescription}/>
        </p>
      </div>
      <div className="col-lg-9">
        <div className="form-group">
          <label className="control-label">
            <FormattedMessage {...messages.formChangeTicketStatus.orderSection.fields.orderId} />
          </label>
          <p className="form-control-static">
            {orderId}
          </p>
        </div>
        <div className="form-group">
          <label className="control-label">
            <FormattedMessage {...messages.formChangeTicketStatus.orderSection.fields.orderStatus} />
          </label>
          <p className="form-control-static">
            <LabelOrderStatus status={order.status}/>
          </p>
        </div>
        <div className="form-group">
          <label className="control-label">
            <FormattedMessage {...messages.formChangeTicketStatus.orderSection.fields.createdAt} />
          </label>
          <p className="form-control-static">
            <FormattedTime value={new Date(order.createdAt)}/>{' '}
            <FormattedDate value={new Date(order.createdAt)} />
          </p>
        </div>
        <div className="from-group">
          <label className="control-label">
            <FormattedMessage {...messages.formChangeTicketStatus.orderSection.fields.item} />
          </label>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.formChangeTicketStatus.orderSection.fields.itemTable.item}/></th>
              <th><FormattedMessage {...messages.formChangeTicketStatus.orderSection.fields.itemTable.quantity}/></th>
              <th><FormattedMessage {...messages.formChangeTicketStatus.orderSection.fields.itemTable.note}/></th>
            </tr>
            </thead>
            <tbody>
              {order.orderLines.map((orderLine,index) =>
                <tr key={index}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <strong>{orderLine.item.name}</strong>
                    <p><FormattedNumber value={orderLine.item.price}/>₫</p>
                  </td>
                  <td>
                    {orderLine.quantity}
                  </td>
                  <td>
                    {orderLine.note}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderInformationSection;
