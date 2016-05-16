import React, { Component } from 'react'
import '../styles/App.scss';
import Welcome from '../components/Welcome'

export default class App extends Component {
  render() {
    return <div>
      <Welcome />
    </div>;
  }
}
