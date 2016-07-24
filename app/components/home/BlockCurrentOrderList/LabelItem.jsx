import React from 'react';
import classNames from 'classnames';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';
import { injectIntl } from 'react-intl';

const LabelItem = ({ orderLine, intl: { formatMessage } }) => {
  const hasNote = orderLine.note.trim() !== '';
  const labelClassName = classNames({
    'label-item': true,
    'has-note': hasNote
  });
  if (!hasNote) {
    return (
      <span className={labelClassName}>{orderLine.item.name}({orderLine.quantity})</span>
    );
  }

  const note = <Popover id="popover-positioned-top popover-trigger-click-root-close" title={formatMessage(messages.modalViewOrder.body.table.note)}>
    {orderLine.note}
  </Popover>;

  return (
    <OverlayTrigger trigger="click" rootClose placement="top" overlay={note}>
      <span className={labelClassName}>{orderLine.item.name}({orderLine.quantity})</span>
    </OverlayTrigger>
  );
}

export default injectIntl(LabelItem);