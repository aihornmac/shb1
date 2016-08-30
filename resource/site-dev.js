#! /usr/bin/env node $(node --v8-options | grep -e '--harmony' | awk '{print $1}' | xargs)
'use strict';
require('shelljs/global');

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

/**
 * inject the same env from build config
 */
process.env.NODE_ENV = 'development';
const __CONFIG__ = require(path.join(__dirname, '../config/web/client'));
global.__CONFIG__ = __CONFIG__;

const devConfig = require(path.join(__dirname, '../config/web/webpack.dev'));
const clientConfig = require(path.join(__dirname, '../config/web/webpack.client.dev'));

const compileClient = () => {
  const clientCompiler = webpack(clientConfig);

  const server = new WebpackDevServer(
    clientCompiler,
    devConfig.server
  );

  const PORT = devConfig.server.port;
  const HOST = devConfig.server.host;

  server.listen(PORT, HOST, err => {
    if (err) {
      console.log(err); // eslint-disable-line
      return;
    }
    console.log(`\nWebpack Dev Server listening on ${HOST ? HOST + ':' : ''}${PORT}`); // eslint-disable-line

    const { run } = require('../source/web/server');

    run();
  });
};

compileClient();
