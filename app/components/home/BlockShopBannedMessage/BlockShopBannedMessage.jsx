import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import { messages } from './BlockShopBannedMessage.i18n';
import { FormattedMessage } from 'react-intl';

export default class BlockShopBannedMessage extends Component {
  render() {
    return (
      <div className="block-shop-banned-message">
        <Modal.Header>
          <Modal.Title>
            <FormattedMessage {...messages.message}/>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormattedMessage {...messages.content}/>
        </Modal.Body>
        <Modal.Footer>
          <Link to='/' className="btn btn-danger">
            <FormattedMessage {...messages.buttonReturn}/>
          </Link>
        </Modal.Footer>
      </div>
    )
  }
}
