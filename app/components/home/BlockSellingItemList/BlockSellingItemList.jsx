import React, { Component, PropTypes } from 'react';
import BlockSellingItem from 'app/components/home/BlockSellingItem';
import './BlockSellingItemList.scss';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';

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
    return (
      <div className="block-selling-item-list clearfix">
        <div className="header clearfix">
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
        <div className="body clearfix">
          {this.state.pagedItems.map((item) => {
            return <BlockSellingItem
              key={item.id}
              item={item}
              shopID={this.props.shopID}
              sellerMode={this.props.sellerMode} />
          })}
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
