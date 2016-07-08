import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
import BlockBookmarks from 'app/components/home/BlockBookmarks';
import ShopsFeed from './ShopsFeed';
import { getMetadata } from 'app/actions/common';
import { getCategories, getShipPlaces, getAggregations } from 'app/selectors';
import NavigationBar from './NavigationBar';
import { signOutGoogle } from 'app/actions';
import _ from 'lodash';
import { withRouter } from 'react-router';
import NotificationSystem from 'react-notification-system';
import io from 'socket.io-client';
import config from 'config';

const socket = io.connect(config.SOCKET_IO_URL);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null
    };

    this.notification = null;

    this.handleSearch = (keyword) => {
      this.props.router.push({
        pathname: '/',
        query: _.assign({}, this.state.query, {
          keyword: keyword
        })
      })
    };

    this.testNotification = (e) => {
      e.preventDefault();
      this.notification.addNotification({
        message: 'Notification message',
        level: 'success',
        position: 'bl'
      });
    }
  }

  componentWillMount() {
    if (_.isEmpty(this.props.categories)) {
      this.props.getMetadata();
    }
  }

  componentDidMount() {
    this.notification = this.refs.notificationSystem;
    socket.on('disconnect', (reason) => {
      // TODO: handle on disconnect, usually if it happened here, it means token is not valid
      console.log(reason);
    });
    socket.on('connect', () => {
      socket.emit('authenticate', {token: window.localStorage['token']});
    });
    socket.on('authenticated', () => {
      console.log('TADA Websocket Connection is authenticated. Now you will receive real-time push via websocket');
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      const { status } = nextProps.error;
      if (status === 401) {
        this.props.signOutGoogle();
      }
    }

    if (nextProps.location) {
      const { query } = nextProps.location;
      if (!_.isEqual(this.state.query, query)) {
        this.setState({
          query: query
        })
      }
    }
  }

  render() {
    const {
      categories,
      shipPlaces,
      aggregations:
        {
          category,
          shipPlace,
          totalCategory,
          totalShipPlace
        }
    } = this.props;

    const { query } = this.state;
    return (
      <div className="home-page">
        <NavigationBar
          displaySearch={true}
          handleSearch={this.handleSearch}
          query={query} />
        <div className="container home-body">
          <div className="row">
            <div className="col-md-3">
              <BlockItemList
                query={query}
                categories={categories}
                categoryCounter={category}
                totalCategory={totalCategory} />
              <BlockDormList
                query={query}
                shipPlaces={shipPlaces}
                shipPlaceCounter={shipPlace}
                totalShipPlace={totalShipPlace} />
              <BlockBookmarks />
              <button onClick={this.testNotification}>Test notification</button>
            </div>
            <div className="col-md-9">
              <div className="row">
                <CarouselPinnedItems />
                <div className="main-column col-md-12">
                  <ShopsFeed query={this.state.query} socket={socket} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.children && <Modal show={true} bsSize={this.props.modalSize}>
          {this.props.children}
        </Modal>}
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

Home.propTypes = {
  signOutGoogle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { user, common } = state;
  return {
    error:        user.error,
    modalSize:    common.modalSize,
    modalMode:    common.modalMode,
    shipPlaces:   getShipPlaces(state),
    categories:   getCategories(state),
    aggregations: getAggregations(state)
  }
};


export default withRouter(connect(mapStateToProps, {
  getMetadata,
  signOutGoogle
})(Home))
