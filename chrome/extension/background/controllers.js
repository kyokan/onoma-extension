/* eslint-disable no-use-before-define */

import * as walletTypes from '../../../app/ducks/wallet';
import Amount from '../../../node_modules/hsd/lib/ui/amount';
const { EXTENSION, NONE } = walletTypes;

export async function getWallet(node) {
  const { wdb } = node.require('walletdb');
  const wallet = await wdb.get('extension');

  if (!wallet) {
    return { address: '', type: NONE };
  }

  const account = await wallet.getAccount('default');

  if (!account) {
    return { address: '', type: NONE };
  }

  const receive = account.receiveAddress();
  const address = receive.toString(node.network);

  const balance = await wallet.getBalance('default');

  return {
    address,
    type: EXTENSION,
    isLocked: await isWalletLocked(node),
    balance: {
      confirmed: Amount.coin(balance.confirmed),
      unconfirmed: Amount.coin(balance.unconfirmed),
    }
  };
}

export async function createWallet(node, passphrase) {
  const { wdb } = node.require('walletdb');
  const wallet = await wdb.create({
    id: 'extension',
    passphrase,
  });
  await wallet.master.unlock(passphrase, 24 * 60 * 60 * 1000);
  wallet.master.mnemonic.toSeed(passphrase);
  const account = await wallet.getAccount('default');

  return {
    address: account.receiveAddress().toString(node.network),
    seed: wallet.master.mnemonic.phrase
  };
}

export async function unlockWallet(req, res) {
  const wallet = await _getWallet(req.node);
  try {
    await wallet.unlock(req.payload, 86400);
    res.send({ id: req.id });
  } catch (err) {
    res.send({
      id: req.id,
      error: true,
      payload: err.message,
    });
  }
}

export async function lockWallet(req, res) {
  const wallet = await _getWallet(req.node);
  try {
    await wallet.lock();
    res.send({ id: req.id });
  } catch (err) {
    res.send({
      id: req.id,
      error: true,
      payload: err.message,
    });
  }
}

export async function isWalletLocked(node) {
  const wallet = await _getWallet(node);
  try {
    await wallet.sign();
  } catch (err) {
    return /no passphrase/gi.test(err.message);
  }
}

export async function getChainInfo(req, res) {
  const { node } = req;
  const { chain: { height, getHash, synced } } = node;
  try {
    const buffer = await getHash.call(node.chain, height);
    const currentHash = buffer.toString('hex');

    res.send({
      id: req.id,
      payload: {
        height,
        currentHash,
        synced,
      },
    });
  } catch (error) {
    res.send({
      id: req.id,
      error: true,
      payload: error.message,
    });
  }
}

export async function send(req, res) {
  const { node } = req;
  const wallet = await _getWallet(node);
  const options = {
    outputs: [
      {
        address: req.payload.address,
        value: Amount.value(req.payload.value),
      },
    ],
  };

  try {
    const mtx = await wallet.createTX(options);
    await wallet.sign(mtx);
    await node.relay(mtx.toTX());
    res.send({
      id: req.id,
      payload: mtx.toJSON()
    });
  } catch (error) {
    res.send({
      id: req.id,
      error: true,
      payload: error.message,
    });
  }
}

export async function toggleResolve() {
  const shouldResovleOnHandshake = localStorage.getItem('shouldResovleOnHandshake');
  localStorage.setItem('shouldResovleOnHandshake', shouldResovleOnHandshake ? '' : '1');
  window.location.reload();
}

// eslint-disable-next-line no-underscore-dangle
async function _getWallet(node) {
  const { wdb } = node.require('walletdb');
  try {
    return await wdb.get('extension');
  } catch (e) {
    return null;
  }
}
