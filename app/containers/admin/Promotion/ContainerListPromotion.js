import React, { Component} from 'react';
import PromotionList from 'app/components/admin/PromotionList';
import NoPromotion from 'app/components/admin/PromotionList/NoPromotion.jsx';
import {
  adminGetShopPromotionCampaign
} from 'app/actions/admin';
import { connect } from 'react-redux';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { withRouter } from 'react-router'

class ContainerListPromotion extends Component {
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
      this.props.router.push(`/admin/promotions?page=${page}&size=${size}`);
    }
  }

  componentWillMount() {
    this.props.adminGetShopPromotionCampaign(this.state.page, this.state.size);
  }

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps.location;
    const page = query.page || 1;
    const size = query.size || 20;
    if(page != this.state.page || size != this.state.size) {
      this.props.adminGetShopPromotionCampaign(page, size);
      this.setState({
        page,
        size
      });
    }
  }

  render() {
    const { promotionManagement: { isFetching, promotionList } } = this.props;
    const { page, size} = this.state;
    let output = ''
    if(isFetching) {
      output = <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
    } else {
      if(promotionList.length === 0) {
        output = <NoPromotion />;
      } else {
        output = (
          <div>
            <PromotionList promotions={promotionList} page={page} size={size} changePageSize={this.changePageSize}/>
          </div>
        );
      }

    }
    return output;
  }
}

ContainerListPromotion.path = '/promotions';
ContainerListPromotion.title = {
  id: 'breadCrumb.promotionManagement.title',
  defaultMessage: 'Promotion management'
};
ContainerListPromotion.description = {
  id: 'breadCrumb.promotionManagement.description',
  defaultMessage: 'List of shop promotion campaign'
};
ContainerListPromotion.faIcon = 'fa-arrow-up';

const mapStateToProps = (state) => ({
  promotionManagement: state.admin.promotionManagement
});


export default connect(mapStateToProps, {
  adminGetShopPromotionCampaign
})(withRouter(ContainerListPromotion));
