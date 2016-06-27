import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormUpdateShipPlaces from 'app/components/home/FormUpdateShipPlaces';

class UpdateShipPlaces extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormUpdateShipPlaces shopID={this.props.params.shopID} />
    );
  }
}
const mapStateToProps = (state) => {
  return {

  }
};


export default connect(mapStateToProps, {

})(UpdateShipPlaces)
