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
import { getNotificationMessage } from 'app/shared/notificationMessages';
import { injectIntl, intlShape } from 'react-intl';

const socket = io.connect(config.SOCKET_IO_URL);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      notification: null
    };

    this.floatNotification = null;

    this.handleSearch = (keyword) => {
      this.props.router.push({
        pathname: '/',
        query: _.assign({}, this.state.query, {
          keyword: keyword
        })
      })
    };
  }

  addNotification(notification) {
    const { formatHTMLMessage } = this.props.intl;
    const notificationMessage = getNotificationMessage(notification);
    if (notificationMessage) {
      const { values, message } = notificationMessage;

      let div = document.createElement('div');
      div.innerHTML = formatHTMLMessage(message, values);
      const messageText = div.innerText;

      this.floatNotification.addNotification({
        message: messageText,
        level: 'success',
        position: 'bl',
        autoDismiss: 20
      });
    }
  }

  componentWillMount() {
    if (_.isEmpty(this.props.categories)) {
      this.props.getMetadata();
    }
  }

  componentDidMount() {
    this.floatNotification = this.refs.notificationSystem;
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

    if (nextProps.notification) {
      if (!_.isEqual(nextProps.notification, this.state.notification)) {
        this.setState({
          notification: nextProps.notification
        });
        this.addNotification(nextProps.notification)
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
          socket={socket}
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
  signOutGoogle:  PropTypes.func.isRequired,
  intl:           intlShape.isRequired
};

const mapStateToProps = (state) => {
  const { user, common, notification } = state;
  return {
    error:        user.error,
    modalSize:    common.modalSize,
    modalMode:    common.modalMode,
    shipPlaces:   getShipPlaces(state),
    categories:   getCategories(state),
    aggregations: getAggregations(state),
    notification: notification.promptNotification
  }
};


export default injectIntl(withRouter(connect(mapStateToProps, {
  getMetadata,
  signOutGoogle
})(Home)))
