import React from 'react';
import Router from 'react-router';
import App from '../components/layout/App';
import BlabView from '../components/blabs/BlabView.jsx';
import AboutView from '../components/static/AboutView';
let DefaultRoute = Router.DefaultRoute;
let Route = Router.Route;

export default (
  <Route name="app" path="/" handler={App} >
    <DefaultRoute name="blabs" handler={BlabView} />
    <Route name="about" handler={AboutView} />
  </Route>
);
