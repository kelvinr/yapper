import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class Menu extends React.Component {
  handleSignOutLink() {
    sessionStorage.setItem('jwt', '');
    location = '/';
  }
  render() {
    if (this.props.signedIn) {
      var signingLink = <li><span onClick={this.handleSignOutLink}>Sign Out</span></li>;
    } else {
      var signingLink = <li><a href={this.props.origin + '/request_token'}>Sign In</a></li>;
    }
    return (
      <div id="menu">
        <span id="menu-link" onClick={this.props.sendMenuClick}><span></span></span>
        <div id="menu-list">
          <div className="pure-menu pure-menu-open">
            <span className="pure-menu-heading">Yapper</span>
            <ul>
              <li><Link to="blabs">Blabs</Link></li>
              <li><Link to="about">About</Link></li>
              {signingLink}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
