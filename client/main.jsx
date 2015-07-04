require('./css/app.css');
require('./css/menu.css');
require('./css/blabs.css');

import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});


