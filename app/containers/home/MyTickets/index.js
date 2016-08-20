import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import { connect } from 'react-redux';
import { updateModalSize } from 'app/actions/common';
import {
  userGetTickets,
  userReopenTicket,
  userCloseTicketModal,
  userCloseTicket
} from 'app/actions/ticket';
import BlockMyTicket from 'app/components/home/BlockMyTicket';
import NoTicket from 'app/components/home/NoTicket';
import { injectIntl } from 'react-intl';
import { PulseLoader } from 'halogen';

const FIRST_PAGE = 1;
const DEFAULT_SIZE = 5;

class MyTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      size: 5
    };

    this.changePageSize = (e) => {
      const size = e.target.value;
      if (!isNaN(size)) {
        this.setState({
          size: size,
          page: FIRST_PAGE
        });
        this.props.userGetTickets('', FIRST_PAGE, size);
      }
    };

    this.prevPage = (e) => {
      e.preventDefault();
      if (this.state.page > FIRST_PAGE) {
        this.setState({
          page: this.state.page - 1
        }, () => {
          this.props.userGetTickets('', this.state.page, this.state.size);
        })
      }
    };

    this.nextPage = (e) => {
      e.preventDefault();
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.props.userGetTickets('', this.state.page, this.state.size);
      })
    }

    this.renderBody = () => {
      const { page, size } = this.state;
      const { userCloseTicket, userCloseTicketModal, ticket: { tickets, isFetching, isSubmitting, submitResult }, userReopenTicket } = this.props;
      if(isFetching) {
        return (
          <div className="text-center" style={{
            'height': '50px',
            'width': '100%',
            'padding': '20px'
          }}>
            <PulseLoader className="feed-loader" color="#b1211e" size="12px" />
          </div>
        );
      }
      if( tickets.length === 0 ) {
        return <NoTicket />
      }
      return <BlockMyTicket
        page={page}
        size={size}
        prevPage={this.prevPage}
        nextPage={this.nextPage}
        changePageSize={this.changePageSize}
        tickets={tickets}
        isSubmitting={isSubmitting}
        submitResult={submitResult}
        userReopenTicket={userReopenTicket}
        userCloseTicketModal={userCloseTicketModal}
        userCloseTicket={userCloseTicket}
      />
    }
  }

  componentWillMount() {
    this.props.updateModalSize('lg');
    this.props.userGetTickets('', FIRST_PAGE, DEFAULT_SIZE);
  }

  componentWillReceiveProps(nextProps) {
    const { ticket: { shouldUpdateTicketList } } = nextProps;
    const { page, size } = this.state;
    if ( shouldUpdateTicketList ) {
      this.props.userGetTickets('', page,size);
    }
  }

  render() {
    const title = {
      id: 'myTicket.title',
      defaultMessage: 'Report tickets'
    };
    const description = {
      id: 'myTicket.description',
      defaultMessage: 'List of reported ticket'
    };
    const { intl: { formatMessage }} = this.props;
    return (
      <div>
        <ModalHeader title={formatMessage(title)} subHeader={formatMessage(description)}/>
        <div className="modal-body my-ticket">
        {this.renderBody()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket
  }
}

export default connect(mapStateToProps, {
  updateModalSize,
  userGetTickets,
  userReopenTicket,
  userCloseTicketModal,
  userCloseTicket
})(injectIntl(MyTickets));
