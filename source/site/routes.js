import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import NotFound from './components/404';

import { modules as reduxModules } from 'src/redux';

const { selectors: { getToken } } = reduxModules('auth');

// Route configuration
export default ({ store }) => (
  /**
   * please keep routes in alphabetical order except
   * for logical necessities
   */
  <div>
    <Route path="/" component={EndPoint}>
      // 404 not found
      <Route path="*" component={NotFound}/>
    </Route>
  </div>
);
