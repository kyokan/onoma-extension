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

// const { wdb } = node.require('walletdb');
// wdb.options.witness = true;
// node.chain.on('block', console.log.bind(console));

let cachedNode = null;

export default async function startNode() {
  if (cachedNode) {
    return cachedNode;
  }

  const node = new SPVNode({
    hash: true,
    query: true,
    prune: true,
    network: 'simnet',
    memory: false,
    coinCache: 30,
    logConsole: true,
    workers: true,
    workerFile: '/worker.js',
    createSocket: (port, host) => ProxySocket.connect('ws://hnsd-1.dev.kyokan.io:8081', port, host),
    logger,
    plugins: [plugin],
    seeds: ['aorsxa4ylaacshipyjkfbvzfkh3jhh4yowtoqdt64nzemqtiw2whk@18.217.172.158']
  });

  // const { wdb } = node.require('walletdb');
  // wdb.options.witness = true;
  // node.chain.on('block', console.log.bind(console));

  await node.ensure();
  await node.open();
  await node.connect();
  node.startSync();

  cachedNode = node;
  return cachedNode;
};
