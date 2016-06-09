import React, { Component, PropTypes } from 'react';
import { 
  Button,
  FormControl,
  Alert
} from 'react-bootstrap';

class FormBanUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  
  onChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  
  onClick(e) {
    const { user } = this.props.formStatus;
    if(user.email === this.state.email) {
      if(e.target.name === 'ban') {
        this.props.adminBanUser(user);
      } else {
        this.props.adminUnbanUser(user); 
      }
      this.setState({
        email: ''
      });
    } 
  }
  
  render() {
    if(!this.props.formStatus.isFetching) {
      const { user } = this.props.formStatus;
      if(user.banned) {
        return (
          <div>
          <Alert bsStyle="danger">
          This user is banned, to unban this user, type <strong>{user.email}</strong> to confirm this action.
          </Alert>
          <FormControl name="email" onChange={this.onChange}/>
          <div className="form-actions">
            <Button bsStyle="danger" name="unban" onClick={this.onClick}>Ban user</Button>
          </div>
          </div>
        );
      }
      return(
        <div>
          <p>This action will ban <strong>{user.email}</strong>.To continue, please type <strong>{user.email}</strong> to confirm.</p>
          <FormControl name="email" onChange={this.onChange}/>
          <div className="form-actions">
            <Button bsStyle="danger" name="ban" onClick={this.onClick}>Ban user</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div>...loading</div>
      );
    }
    
  }
}

export default FormBanUser;