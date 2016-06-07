import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import { connect } from 'react-redux';
import { updateModalSize } from '../../actions';

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateModalSize('lg');
  }

  render() {
    return (
      <div>
        <ModalHeader title="Bánh mỳ kebab" subHeader="Ngon nhất Hoà Lạc, ship toàn dom."/>
        <div className="modal-body">
          Shop details
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {

  }
};

export default connect(mapStateToProps, {
  updateModalSize
})(Shop)

Shop.modalSize = 'lg';
