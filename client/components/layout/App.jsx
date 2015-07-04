import React from 'react';
import Reqwest from 'reqwest';
import BlabView from '../blabs/BlabView';
import Menu from './Menu';
import Router from 'react-router';
import Uri from 'jsuri';
let RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
      showMenu: false,
      signedIn: false,
      currentUser: {handle: ''}};
  }
  componentWillMount() {
    let jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (!!jwt) {sessionStorage.setItem('jwt', jwt);}
  }
  componentDidMount() {
    if (!!sessionStorage.getItem('jwt')) {this.currentUserFromAPI();}
  }
  currentUserFromAPI() {
    this.readFromAPI(this.state.origin + '/current_user', function(user) {
      this.setState({signedIn: true, currentUser: user})
    }.bind(this));
  }
  handleMenuClick() {
    this.setState({showMenu: !this.state.showMenu});
  }
  readFromAPI(url, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: 'GET',
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      success: successFunction,
      error: error => {
        console.error(url, error['response']);
        location = '/';
      }
    });
  }
  writeToAPI(method, url, data, successFunction) {
    Reqwest({
      url: url,
      data: data,
      type: 'json',
      method: method,
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      success: successFunction,
      error: error => {
        console.error(url, error['response']);
        location = '/';
      }
    });
  }
  render() {
    let menu = this.state.showMenu ? 'show-menu' : 'hide-menu';

    return (
      <div id="app" className={menu}>
        <Menu origin={this.state.origin} sendMenuClick={this.handleMenuClick} signedIn={this.state.signedIn} />
        <div id="content">
          <RouteHandler origin={this.state.origin} readFromAPI={this.readFromAPI} writeToAPI={this.writeToAPI} currentUser={this.state.currentUser} signedIn={this.state.signedIn}/>
        </div>
      </div>
    );
  }
};
