import React from 'react';
import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';

export default class App extends React.Component {
    render() {
        return <div>
            <Button bsStyle="primary" bsSize="large">Large button</Button>
        </div>;
    }
}
