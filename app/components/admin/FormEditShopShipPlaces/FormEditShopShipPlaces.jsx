import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Checkbox,
  Button
} from 'react-bootstrap';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditShopShipPlaces/FormEditShopShipPlaces.i18n';
import AlertSubmitResult from 'app/components/admin/AlertSubmitResult';

class FormEditShopShipPlaces extends React.Component {
  constructor(props) {
    super(props);

    const { shop } = this.props;

    this.state = {
      isValid: false,
      informationToBeUpdated: {
        openStatus: shop.opening,
        publishStatus: shop.status,
        shipPlaces: shop.shipPlaces
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleShipPlacesChange = this.handleShipPlacesChange.bind(this);
  }

  handleSubmit() {
    const { shop } = this.props;
    const { informationToBeUpdated } = this.state;
    if(informationToBeUpdated.openStatus != shop.opening || informationToBeUpdated.publishStatus != shop.status) {
      this.props.submitOpeningStatus({ opening: informationToBeUpdated.openStatus, status: Number(informationToBeUpdated.publishStatus) });
    }
    if(informationToBeUpdated.shipPlaces !== shop.shipPlaces) {
      this.props.submitShipPlaces({shipPlaces: informationToBeUpdated.shipPlaces});
    }

    this.setState({
      isValid: false
    });
  }

  handleOnChange(e) {
    let informationToBeUpdated = this.state.informationToBeUpdated;
    informationToBeUpdated[e.target.name] = e.target.value;
    this.setState({
      isValid: true,
      informationToBeUpdated
    });
  }

  handleShipPlacesChange(e) {
    let informationToBeUpdated = this.state.informationToBeUpdated;
    const trueValue = _.toInteger(e.target.value);
    if(_.includes(informationToBeUpdated.shipPlaces, trueValue)) {
    const newShipPlaces = _.remove(informationToBeUpdated.shipPlaces,(shipPlace) => shipPlace != trueValue);
    informationToBeUpdated.shipPlaces = newShipPlaces;
      this.setState({
        informationToBeUpdated
      });
    } else {
    const newShipPlaces = _.concat(informationToBeUpdated.shipPlaces, trueValue);
    informationToBeUpdated.shipPlaces = newShipPlaces;
      this.setState({
        informationToBeUpdated
      });
    }
    this.setState({
      isValid: true
    });
  }

  render() {
    const { informationToBeUpdated, isValid } = this.state;
    const { submitResult, isSubmitting, intl: { formatMessage } } = this.props;
    return (
      <div className="row">
        <Col lg={3}>
          <h4>
            <strong>
              <FormattedMessage {...messages.formEditShopShipPlaces.sectionName} />
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formEditShopShipPlaces.sectionDescription}/>
          </p>
        </Col>
        <Col lg={9}>
          <FormGroup>
            <ControlLabel>
              <FormattedMessage {...messages.formEditShopShipPlaces.fields.open}/>
            </ControlLabel>
            <FormControl
              componentClass="select"
              name="openStatus"
              defaultValue={informationToBeUpdated.openStatus || false}
              onChange={this.handleOnChange}
              >
              <option value={true}>
                {formatMessage(messages.formEditShopShipPlaces.openingStatus.open)}
              </option>
              <option value={false}>
                {formatMessage(messages.formEditShopShipPlaces.openingStatus.close)}
              </option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <FormattedMessage {...messages.formEditShopShipPlaces.fields.publish}/>
            </ControlLabel>
            <FormControl
              componentClass="select"
              name="publishStatus"
              defaultValue={informationToBeUpdated.publishStatus || 0}
              onChange={this.handleOnChange}
              >
              <option value={1}>
                {formatMessage(messages.formEditShopShipPlaces.publishStatus.published)}
              </option>
              <option value={0}>
                {formatMessage(messages.formEditShopShipPlaces.publishStatus.unpublished)}
              </option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <FormattedMessage {...messages.formEditShopShipPlaces.fields.shipPlaces}/>
            </ControlLabel>
            <div className="ship-place-checkbox-wrapper">
            {this.props.availableShipPlaces.map(shipPlace =>
            <Checkbox
              key={shipPlace.id}
              value={shipPlace.id}
              checked={_.includes(informationToBeUpdated.shipPlaces, shipPlace.id)}
              onChange={this.handleShipPlacesChange}
              >
              {shipPlace.name}
            </Checkbox>
            )}
            </div>

          </FormGroup>
          <div className="form-actions">
            {
              submitResult !== '' &&
              <AlertSubmitResult result={submitResult} />
            }
            <Button bsStyle="success" onClick={this.handleSubmit} disabled={isSubmitting || !isValid}>
              {formatMessage(messages.formEditShopShipPlaces.button.saveChanges)}{isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
            </Button>
          </div>
        </Col>
      </div>
    );
  }
}

export default injectIntl(FormEditShopShipPlaces);
