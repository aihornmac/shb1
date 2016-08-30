module.exports = {
  site: {
    host: '0.0.0.0',
    port: 7980,

    // the base url of GraphQL server for web source code
    graphqlUrl: '//book.aihorn.com/graphql',

    // the base url of static file server for web source code
    staticUrl: '//book.aihorn.com/static',

    // webpack dev server configurations
    dev: {
      host: '0.0.0.0',
      port: 7985,

      // the base url of webpack dev server for web source code
      baseUrl: '//book.aihorn.com/webpack',

      // the relative path for webpack where static files will be mounted
      publicPath: '/static/',

      // the base url of static file server for web source code
      staticUrl: '//book.aihorn.com/webpack/static/',
    }
  },
  graphql: {
    host: '0.0.0.0',
    port: 7981
  }
};
