import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

const displayAsModal = (ComposedComponent) => {
  const mapStateToProps = (state) => ({
    modalSize: state.common.modalSize,
  });

  class ModalComponent extends Component {
    render() {
      return(
        <Modal show={true} bsSize={this.props.modalSize}>
          <ComposedComponent {...this.props}/>
        </Modal>
      )
    }
  }

  return connect(mapStateToProps)(ModalComponent);
};

export {
  displayAsModal
}
