import './utils/unref';
// eslint-disable-next-line import/imports-first
import Logger from 'blgr';
import SPVNode from '../../../node_modules/hsd/lib/node/spvnode';
import plugin from '../../../node_modules/hsd/lib/wallet/plugin';
import ProxySocket from './utils/proxysocket';

const logger = new Logger({
  level: 'debug',
  console: true
});

const node = new SPVNode({
  hash: true,
  query: true,
  prune: true,
  network: 'testnet',
  memory: false,
  coinCache: 30,
  logConsole: true,
  workers: true,
  workerFile: '/worker.js',
  createSocket: (port, host) => ProxySocket.connect('ws://localhost:8080', port, host),
  logger,
  plugins: [plugin]
});


// const { wdb } = node.require('walletdb');
// wdb.options.witness = true;
// node.chain.on('block', console.log.bind(console));

export default async function () {
  await node.ensure();
  await node.open();
  await node.connect();
  node.startSync();
  return node;
};
