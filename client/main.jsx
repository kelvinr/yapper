require('./css/app.sass');
require('./css/menu.sass');
require('./css/blabs.sass');

import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});


