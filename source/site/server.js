import http from 'http';
import koa from 'koa';
import chalk from 'chalk';
import moment from 'moment';
import isomorphic from './helpers/isomorphic';
import config from 'config/web';

const initAt = moment();
const initMark = (+initAt).toString('36');
let requestIndex = 0;

const { default: serverMiddleware } = require('./helpers/serverMiddleware');

const app = new koa();

const log = (str, { color }) => {
  const time = moment();
  let output = `[${initMark}] - ${time.format('YYYY-MM-DD HH:mm:ss SSS')} - ${str}`; // eslint-disable-line
  if (chalk[color]) {
    output = chalk[color](output);
  }
  console.log(output); // eslint-disable-line
};

log.grey = (str, options) => log(str, { color: 'grey', ...options });

/**
 * log middleware
 */
app.use(async (ctx, next) => {
  const id = requestIndex++;
  const receivedAt = moment();
  log.grey(`[${id}] received from ${ctx.url}`);
  try {
    await next();
  } finally {
    const finishedAt = moment();
    const timecost = finishedAt.diff(receivedAt);
    log(`[${id}] finished within ${timecost}ms`);
  }
});

/**
 * service worker
 */
app.use((ctx, next) => {
  if (ctx.path === '/sw') {
    const assets = isomorphic.assets();
    ctx.body = `importScripts('${assets.javascript.sw}')`;
    ctx.set('Content-Type', 'application/javascript');
    return;
  }
  return next();
});

/**
 * page render middleware
 */
app.use(serverMiddleware);

/**
 * create server
 */
const PORT = config.port;
const HOST = config.host;
const server = http.createServer(app.callback());

server.listen(PORT, HOST, err => {
  if (err) {
    console.log(err); // eslint-disable-line
  }
  const { address, port } = server.address();
  console.log(`Website listening on ${address ? address + ':' : 'port '}${port}`); // eslint-disable-line
});
