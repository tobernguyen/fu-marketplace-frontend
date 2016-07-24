import React, { Component } from 'react';

class TicketManagement extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


TicketManagement.path = '/ticket';
TicketManagement.title = 'Ticket Management';
TicketManagement.description = 'Ticket Management';
TicketManagement.faIcon = 'fa-ticket';

export default TicketManagement;
