import React, { Component } from 'react';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/admin/FormChangeTicketStatus/FormChangeTicketStatus.i18n';
import LabelUserInformation from 'app/components/admin/LabelUserInformation';

class UserInformationSection extends Component {
  componentWillMount() {
    const { selectedUserId } = this.props;
    this.props.adminGetUser(selectedUserId);
  }
  render() {
    const { isFetchingUser, selectedUser } = this.props;
    if(isFetchingUser) {
      return <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
    }
    return (
      <div className="row">
        <div className="col-lg-3">
          <h4>
            <strong>
              <FormattedMessage {...messages.formChangeTicketStatus.userSection.sectionName}/>
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formChangeTicketStatus.userSection.sectionDescription}/>
          </p>
        </div>
        <div className="col-lg-9">
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.userSection.fields.fullName}/>
            </label>
            <p className="form-control-static">
              <LabelUserInformation user={selectedUser}/>
            </p>
          </div>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.userSection.fields.phone}/>
            </label>
            <p className="form-control-static">
              {selectedUser.phone || <FormattedMessage {...messages.formChangeTicketStatus.userSection.message.noPhone}/>}
            </p>
          </div>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.userSection.fields.email}/>
            </label>
            <p className="form-control-static">
              {selectedUser.email}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInformationSection;
