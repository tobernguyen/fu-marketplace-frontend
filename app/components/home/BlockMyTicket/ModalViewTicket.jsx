import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { messages } from 'app/components/home/BlockMyTicket/BlockMyTicket.i18n.js';
import { FormattedRelative, FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import LabelTicketStatus from 'app/components/admin/LabelTicketStatus';
import TicketStatus from 'app/shared/ticketStatus';
import AsyncResultCode from 'app/shared/asyncResultCodes';

import './BlockMyTicket.scss';

class ModalViewTicket extends Component {
  render() {
    const { showModal, closeModal, reopen, close, ticket, isSubmitting, submitResult } = this.props;
    let shopId = 0;
    let shopName = '';
    if(ticket.shop) {
      shopId = ticket.shop.id;
      shopName = ticket.shop.name;
    }
    return (
      <Modal className="view-ticket-modal" show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>
            <FormattedMessage {...messages.blockMyTicket.modalViewTicket.title}/>
          </Modal.Title>
          <p className="sub-header">
            <FormattedMessage {...messages.blockMyTicket.modalViewTicket.subHeader}/>
          </p>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <strong>
              <FormattedMessage {...messages.blockMyTicket.modalViewTicket.ticketInformation.title} />
            </strong>
          </h5>
          <div className="ticket-information">
            <div>
              <strong>
                <FormattedMessage {...messages.blockMyTicket.modalViewTicket.ticketInformation.fields.ticketId}/>
              </strong>
              <span>{ticket.id}</span>
            </div>
            <div>
              <strong>
                <FormattedMessage {...messages.blockMyTicket.modalViewTicket.ticketInformation.fields.shop}/>
              </strong>
              <span><Link to={`/shops/${shopId}`}>{shopName}</Link></span>
            </div>
            <div>
              <strong>
                <FormattedMessage {...messages.blockMyTicket.modalViewTicket.ticketInformation.fields.userComment}/>
              </strong>
              <textarea
                className="form-control"
                defaultValue={ticket.userNote}
                disabled="true"
                />
            </div>
            <div>
              <strong>
                <FormattedMessage {...messages.blockMyTicket.modalViewTicket.ticketInformation.fields.status}/>
              </strong>
              <span>
                <LabelTicketStatus status={ticket.status} />
              </span>
            </div>
            <div>
              <strong>
                <FormattedMessage {...messages.blockMyTicket.modalViewTicket.ticketInformation.fields.createdAt}/>
              </strong>
              <span>
                <FormattedRelative value={new Date(ticket.createdAt) || new Date()} />
              </span>
            </div>
          </div>

          {
            ticket.status == TicketStatus.CLOSED &&
            <div>
              <hr />
              <div>
                <strong>
                  <FormattedMessage {...messages.blockMyTicket.modalViewTicket.ticketInformation.fields.adminComment}/>
                </strong>
                <textarea
                  className="form-control"
                  defaultValue={ticket.adminComment}
                  disabled="true"
                  />
              </div>
            </div>

          }
          {
            submitResult == AsyncResultCode.REOPEN_TICKET_FAIL &&
            <div className="alert alert-danger">
              <FormattedMessage {...messages.blockMyTicket.modalViewTicket.error}/>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {
            ticket.status == TicketStatus.CLOSED &&
            <button className="btn btn-danger" onClick={reopen} disabled={isSubmitting}>
              <FormattedMessage {...messages.blockMyTicket.modalViewTicket.button.reopen}/>{isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
            </button>
          }
          {
            ticket.status != TicketStatus.CLOSED &&
            <button className="btn btn-danger" onClick={close} disabled={isSubmitting}>
              <FormattedMessage {...messages.blockMyTicket.modalViewTicket.button.close}/>{isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
            </button>
          }
          <button className="btn btn-close" onClick={closeModal}>
            <FormattedMessage {...messages.blockMyTicket.modalViewTicket.button.close}/>
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default injectIntl(ModalViewTicket);
