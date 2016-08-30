import React from 'react';

export default ({ location }) => (
  <div>
    <h1>404</h1>
    <div>Unknown uri: {location.pathname}</div>
  </div>
);
