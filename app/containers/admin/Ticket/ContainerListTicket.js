import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  adminGetTickets
} from 'app/actions/ticket';
import TicketList from 'app/components/admin/TicketList';
import NoTicket from 'app/components/admin/TicketList/NoTicket.jsx';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { withRouter } from 'react-router'

class ComponentListTicket extends Component {
  constructor(props) {
    super(props);

    const { page, size } = this.props.location.query;

    this.state = {
      page: page || 1,
      size: size || 20
    };

    this.changePageSize = (e) => {
      const size = e.target.value;
      const { query } = this.props.location;
      const page = query.page || 1;
      this.props.router.push(`/admin/tickets?page=${page}&size=${size}`);
    }
  }

  componentWillMount() {
    this.props.adminGetTickets('', this.state.page, this.state.size);
  }

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps.location;
    const page = query.page || 1;
    const size = query.size || 20;

    if(page != this.state.page || size != this.state.size) {
      this.props.adminGetTickets('', page, size);
      this.setState({
        page,
        size
      });
    }
  }

  render() {
    const { ticket: { tickets, isFetching } } = this.props;
    const { page, size} = this.state;
    if(isFetching) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    }
    if(tickets.length === 0) {
      return <NoTicket />
    }
    return (

      <div>
        <TicketList tickets={tickets} isFetching={isFetching} page={page} size={size} changePageSize={this.changePageSize}/>;
      </div>
    );
  }
}

ComponentListTicket.path = '/ticket';
ComponentListTicket.title = {
  id: 'breadCrumb.ticketManagement.title',
  defaultMessage: 'Ticket management'
};
ComponentListTicket.description = {
  id: 'breadCrumb.ticketManagement.description',
  defaultMessage: 'List of ticket'
};
ComponentListTicket.faIcon = 'fa-ticket';

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket
  }
}

export default connect(mapStateToProps, {
  adminGetTickets
})(withRouter(ComponentListTicket));
