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
    if (!!jwt) {sessionStorage.getItem('jwt', jwt);}
  }
  componentDidMount() {
    if (!!sessionStorage.getItem('jwt')) {this.currentUserFromAPI();}
  }
  currentUserFromAPI() {
    this.readFromAPI(this.props.origin + '/current_user', user =>
      this.setState({signedIn: true, currentUser: user})
    );
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
          <RouteHandler origin={this.state.origin} readFromAPI={this.readFromAPI} signedIn={this.state.signedIn}/>
        </div>
      </div>
    );
  }
};
