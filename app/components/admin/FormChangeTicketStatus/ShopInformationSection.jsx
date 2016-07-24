import React, { Component } from 'react';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/admin/FormChangeTicketStatus/FormChangeTicketStatus.i18n';
import LabelUserInformation from 'app/components/admin/LabelUserInformation';
import { Link } from 'react-router';

class ShopInformationSection extends Component {
  componentWillMount() {
    const { selectedShopId } = this.props;
    this.props.adminGetShop(selectedShopId);
  }
  render() {
    const { isFetching, selectedShop } = this.props;
    if(isFetching) {
      return <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
    }
    return (
      <div className="row">
        <div className="col-lg-3">
          <h4>
            <strong>
              <FormattedMessage {...messages.formChangeTicketStatus.shopSection.sectionName} />
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formChangeTicketStatus.shopSection.sectionDescription}/>
          </p>
        </div>
        <div className="col-lg-9">
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.shopSection.fields.shopName} />
            </label>
            <p className="form-control-static">
              <Link to={`admin/shops/${selectedShop.id}/edit`}>{selectedShop.name}</Link>
            </p>
          </div>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.shopSection.fields.seller} />
            </label>
            <p className="form-control-static">
              <LabelUserInformation user={selectedShop.seller} />
            </p>
          </div>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.shopSection.fields.phone} />
            </label>
            <p className="form-control-static">
              {selectedShop.phone}
            </p>
          </div>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.shopSection.fields.sellerPhone} />
            </label>
            <p className="form-control-static">
              {selectedShop.seller.phone || <FormattedMessage {...messages.formChangeTicketStatus.userSection.message.noPhone} />}
            </p>
          </div>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formChangeTicketStatus.shopSection.fields.sellerEmail} />
            </label>
            <p className="form-control-static">
              {selectedShop.seller.email}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopInformationSection;
