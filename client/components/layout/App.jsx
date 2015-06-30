import React from 'react';
import Reqwest from 'reqwest';
import BlabView from '../blabs/BlabView';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};
  }
  readFromAPI(url, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: 'GET',
      contentType: 'application/json',
      success: successFunction,
      error: error => {
        console.error(url, error['response']);
        location = '/';
      }
    });
  }
  render() {
    return (
      <div id="content">
        <BlabView origin={this.state.origin} readFromAPI={this.readFromAPI} />
      </div>
    );
  }
}
