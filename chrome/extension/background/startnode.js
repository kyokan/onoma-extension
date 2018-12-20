import './utils/unref';
// eslint-disable-next-line import/imports-first
import Logger from 'blgr';
import SPVNode from '../../../node_modules/hsd/lib/node/spvnode';
import plugin from '../../../node_modules/hsd/lib/wallet/plugin';
import ProxySocket from './utils/proxysocket';
import Question from '../../../node_modules/bns/lib/wire';

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
    createSocket: (port, host) => ProxySocket.connect('ws://onoma-infra.dev.kyokan.io:8888', port, host),
    logger,
    plugins: [plugin],
    seeds: ['aorsxa4ylaacshipyjkfbvzfkh3jhh4yowtoqdt64nzemqtiw2whk@45.55.108.48']
  });

  // const { wdb } = node.require('walletdb');
  // wdb.options.witness = true;
  // node.chain.on('block', console.log.bind(console));
  await node.ensure();
  await node.open();
  await node.connect();
  node.startSync();

  cachedNode = node;``
  return cachedNode;
};
