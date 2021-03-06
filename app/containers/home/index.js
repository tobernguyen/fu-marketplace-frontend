import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMetadata, updateQuery, createWebSocket, resetRequestError } from 'app/actions/common';
import NavigationBar from './NavigationBar';
import { signOutGoogle } from 'app/actions';
import _ from 'lodash';
import { withRouter } from 'react-router';
import NotificationSystem from 'react-notification-system';
import io from 'socket.io-client';
import config from 'config';
import { getNotificationMessage } from 'app/shared/notificationMessages';
import { injectIntl, intlShape } from 'react-intl';
import { getCategories } from 'app/selectors';
import { accessTokenKey } from 'app/config';
import { HTTP_STATUS_CODE } from 'app/shared/statusCode';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: null,
      errorMessage: null
    };

    this.floatNotification = null;

    this.handleSearch = (keyword) => {
      this.props.router.push({
        pathname: '/',
        query: _.assign({}, this.props.query, {
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

    if (this.props.isAuthenticated) {
      const socket = io.connect(config.SOCKET_IO_URL);
      socket.on('connect', () => {
        socket.emit('authenticate', {token: window.localStorage[accessTokenKey]});
      });
      socket.on('authenticated', () => {
        this.props.createWebSocket(socket);
      });
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.error) {
      const { status } = nextProps.error;
      if (HTTP_STATUS_CODE.INVALID_TOKEN <= status && status < HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        this.setState({
          errorMessage: {
            id: 'sessionEnded',
            defaultMessage: 'You session has been ended. Please sign in again.'
          }
        });
        const { socket } = this.props;
        if (socket) {
          socket.disconnect();
        }
      } else if (status === HTTP_STATUS_CODE.NOT_FOUND) {
        this.props.resetRequestError();
        this.props.router.push({
          pathname: '/404'
        })
      }
    } else {
      this.setState({
        errorMessage: null
      })
    }

    if (nextProps.location) {
      const { query } = nextProps.location;
      if (!_.isEqual(this.props.query, query)) {
        this.props.updateQuery(query);
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
    return (
      <div className="home-page">
        <NavigationBar
          displaySearch={true}
          handleSearch={this.handleSearch}
          query={this.props.query} />

        {this.props.children}

        <NotificationSystem ref="notificationSystem" />

        {this.state.errorMessage && <Modal show={true} bsSize="sm">
          <Modal.Header>
            <Modal.Title>
              <FormattedMessage {...{ id: 'notSignedIn', defaultMessage: 'Not signed in' }} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedMessage {...this.state.errorMessage} />
          </Modal.Body>
          <Modal.Footer className="error-modal-footer">
            <Button bsStyle="primary" onClick={() => this.props.signOutGoogle()}>OK</Button>
          </Modal.Footer>
        </Modal>}
      </div>
    );
  }
}

Home.propTypes = {
  signOutGoogle:  PropTypes.func.isRequired,
  intl:           intlShape.isRequired
};

const mapStateToProps = (state) => {
  const { notification, auth, common } = state;
  return {
    error:            common.error,
    notification:     notification.promptNotification,
    categories:       getCategories(state),
    query:            common.query,
    socket:           common.socket,
    isAuthenticated:  auth.isAuthenticated
  }
};


export default injectIntl(withRouter(connect(mapStateToProps, {
  getMetadata,
  signOutGoogle,
  updateQuery,
  createWebSocket,
  resetRequestError
})(Home)))
