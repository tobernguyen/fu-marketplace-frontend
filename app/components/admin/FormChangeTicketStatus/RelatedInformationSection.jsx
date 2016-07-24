import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/admin/FormChangeTicketStatus/FormChangeTicketStatus.i18n';


const RelatedInformationSection = ({ ticket }) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <h4>
          <strong>
            <FormattedMessage {...messages.formChangeTicketStatus.relatedSection.sectionName}/>
          </strong>
        </h4>
        <p>
          <FormattedMessage {...messages.formChangeTicketStatus.relatedSection.sectionDescription}/>
        </p>
      </div>
      <div className="col-lg-9">
        <div className="form-group">
          <label className="control-label">
            <FormattedMessage {...messages.formChangeTicketStatus.relatedSection.fields.userNote} />
          </label>
          <textarea className="form-control" disabled="true" defaultValue={ticket.userNote}>
          </textarea>
        </div>
      </div>
    </div>
  )
}

export default RelatedInformationSection;
