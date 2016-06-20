import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Checkbox,
  Button,
  Alert
} from 'react-bootstrap';
import _ from 'lodash';
import AsyncResultCode from 'app/shared/asyncResultCodes';

const shipPlaces = [
    {
      id: 1,
      name: "Dom A"
    },
    {
      id: 2,
      name: "Dom B"
    },
    {
      id: 3,
      name: "Dom C"
    },
    {
      id: 4,
      name: "Dom D"
    },
    {
      id: 5,
      name: "Dom E"
    },
    {
      id: 6,
      name: "Dom F"
    }
];

class FormEditShopShipPlaces extends React.Component {
  constructor(props) {
    super(props);
    
    const { shop } = this.props;
    
    this.state = {
      informationToBeUpdated: {
        openStatus: shop.opening,
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
    if(informationToBeUpdated.openStatus != shop.opening) {
      this.props.submitOpeningStatus({ opening: informationToBeUpdated.openStatus });
    }
    if(informationToBeUpdated.shipPlaces !== shop.shipPlaces) {
      this.props.submitShipPlaces({shipPlaces: informationToBeUpdated.shipPlaces});
    }
  }
    
  handleOnChange(e) {
    let informationToBeUpdated = this.state.informationToBeUpdated;
    informationToBeUpdated[e.target.name] = e.target.value;
    this.setState({
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
  }
  
  render() {
    const { informationToBeUpdated } = this.state;
    const { submitResult, isSubmitting } = this.props;
    return (
      <div className="row">
        <Col lg={3}>
          <h4><strong>Operational Information</strong></h4>
          <p>Information that relate to operation of shop</p>
        </Col>
        <Col lg={9}>
          <FormGroup>
            <ControlLabel>Open status</ControlLabel>
            <FormControl
              componentClass="select"
              name="openStatus"
              defaultValue={informationToBeUpdated.openStatus || false}
              onChange={this.handleOnChange}
              >
              <option value={true}>Open</option>
              <option value={false}>Close</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Ship places</ControlLabel>
            {shipPlaces.map(shipPlace =>
            <Checkbox
              key={shipPlace.id}
              value={shipPlace.id}
              checked={_.includes(informationToBeUpdated.shipPlaces, shipPlace.id)}
              onChange={this.handleShipPlacesChange}
              >
              {shipPlace.name}
            </Checkbox>
            )}
          </FormGroup>
          <div className="form-actions">
            {submitResult === AsyncResultCode.UPDATE_SHOP_SHIP_PLACES_SUCCESS && <Alert bsStyle="success">Operational Information has been saved</Alert>}
            {submitResult === AsyncResultCode.UPDATE_SHOP_SHIP_PLACES_FAIL && <Alert bsStyle="danger">Operational Information has been saved</Alert>}
            <Button bsStyle="success" onClick={this.handleSubmit} disabled={isSubmitting}>Save Changes</Button>
          </div>
        </Col>
      </div>
    );
  }
}

export default FormEditShopShipPlaces;