import React, { Component, PropTypes } from 'react';
import BlockSellingItem from 'app/components/home/BlockSellingItem';
import BlockSellingItemForUser from 'app/components/home/BlockSellingItemForUser';
import './BlockSellingItemList.scss';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';
import classNames from 'classnames';

export default class BlockSellingItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      totalPage: 0,
      items: [],
      pagedItems: []
    };

    this.pageChanged = (eventKey) => {
      this.setState({
        activePage: eventKey,
        pagedItems: _.slice(this.state.items, (eventKey - 1) * 4, (eventKey * 4))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items && nextProps.items.length > 0) {
      this.setState({
        totalPage: Math.ceil(nextProps.items.length / 4),
        items: nextProps.items,
        activeKey: 1,
        pagedItems: _.slice(nextProps.items, 0, 4)
      })
    }
  }
  render() {
    const { sellerMode } = this.props;
    return (
      <div className="block-selling-item-list clearfix">
        <div className="header clearfix">
          <div className={classNames({'col-md-9 col-xs-8': !sellerMode})}>
            <ul className="nav nav-pills">
              <li className="active">
                <a href="#">Tất cả <span>8</span></a>
              </li>
              <li>
                <a href="#">Đồ ăn <span>3</span>
                </a>
              </li>
              <li>
                <a href="#">Đồ uống <span>5</span></a>
              </li>
            </ul>
          </div>
          {!sellerMode && <div className="col-md-3 col-xs-4 row">
            <div className="cart">
              <a href="#">
                <h4>
                  <span className="total">$0.00</span>
                  <i className="fa fa-shopping-cart"/>
                </h4>
                <p>Empty cart</p>
              </a>
            </div>
          </div>}
        </div>
        <div className="body clearfix">
          {this.state.pagedItems.map((item) =>
          {if (sellerMode) {
            return <BlockSellingItem
              key={item.id}
              item={item}
              shopID={this.props.shopID} />
          } else {
            return <BlockSellingItemForUser
              key={item.id}
              item={item}
              addToCard={this.props.addToCard}
              buyNow={this.props.buyNow}
              shopID={this.props.shopID}/>
          }}
          )}
        </div>
        <div className="footer clearfix">
          <Pagination
            bsSize="small"
            items={this.state.totalPage}
            activePage={this.state.activePage}
            onSelect={this.pageChanged} />
        </div>
      </div>
    )
  }
}

BlockSellingItemList.propTypes = {
  items: PropTypes.array.isRequired,
  sellerMode: PropTypes.bool.isRequired
};
