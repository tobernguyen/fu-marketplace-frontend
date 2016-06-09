import React, { Component } from 'react';
import { connect } from 'react-redux';


class SellerDashboard extends Component {
  render() {
    return (
      <div className="seller-dashboard">
        Seller dashboard
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {

  }
};

export default connect(mapStateToProps, {

})(SellerDashboard)
