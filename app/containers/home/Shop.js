import React, { Component } from 'react';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import { connect } from 'react-redux';
import { updateModalMode, updateModalSize } from '../../actions/common';
import SellingItemList from './SellingItemList';
import { Link } from 'react-router';

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateModalSize('lg');
    this.props.updateModalMode(true);
  }

  componentWillUnmount() {
    this.props.updateModalMode(false);
  }

  render() {
    return (
      <div className="shop-detail-modal">
        <BlockShopHeader/>
        <SellingItemList />
        <Link to='/' className="close"><span>×</span></Link>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {

  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  updateModalMode
})(Shop)
