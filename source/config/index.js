const path = require('path');

module.exports = {
  site: {
    host: '0.0.0.0',
    port: 7980,

    // the base url of GraphQL server for web source code
    graphqlUrl: '//locahost:7981/graphql',

    // the base url of static file server for web source code
    staticUrl: '//locahost:7981/static',

    // webpack dev server configurations
    dev: {
      host: '0.0.0.0',
      port: 7985,

      // the base url of webpack dev server for web source code
      baseUrl: '//localhost:7985',

      // the relative path for webpack where static files will be mounted
      publicPath: '/static/',

      // the base url of static file server for web source code
      staticUrl: '//localhost:7985/static/',
    }
  },
  graphql: {
    host: '0.0.0.0',
    port: 7981,
  },
  crypto: {
    publicKey: path.join(__dirname, 'public.key'),
    privateKey: path.join(__dirname, 'private.key'),
  },
};
