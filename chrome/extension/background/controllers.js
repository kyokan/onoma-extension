/* eslint-disable no-use-before-define */

import * as walletTypes from '../../../app/ducks/wallet';
import Amount from '../../../node_modules/hsd/lib/ui/amount';
import MasterKey from 'hsd/lib/wallet/masterkey';
import { toggleResolution } from './resolver/resolve';

const { EXTENSION, NONE } = walletTypes;
const ONE_DAY = 24 * 60 * 60 * 1000;

const EMPTY_WALLET = {
  address: '',
  type: NONE,
  initialized: false,
  isLocked: true,
  balance: {
    confirmed: '',
    unconfirmed: ''
  }
};

export async function getWallet(node) {
  const { wdb } = node.require('walletdb');
  const wallet = await wdb.get('extension');

  if (!wallet) {
    return EMPTY_WALLET;
  }

  const account = await wallet.getAccount('default');

  if (!account) {
    return EMPTY_WALLET;
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
    },
    initialized: !!localStorage.getItem('initialized'),
  };
}

export async function removeWallet(req, res) {
  try {
    localStorage.removeItem('initialized');
    await _removeWallet(node);
    res.send({ id: req.id });
  } catch (err) {
    res.send({
      id: req.id,
      error: true,
      payload: err.message
    });
  }
}

export async function completeInitialization(req, res) {
  localStorage.setItem('initialized', '1');
  res.send({ id: req.id })
}

export async function createWallet(node, passphrase) {
  const existingWallet = await _getWallet(node);
  if (existingWallet) {
    await _removeWallet(node);
  }

  const { wdb } = node.require('walletdb');
  const wallet = await wdb.create({
    id: 'extension',
    passphrase,
  });
  await wallet.master.unlock(passphrase, ONE_DAY);
  wallet.master.mnemonic.toSeed(passphrase);
  const account = await wallet.getAccount('default');

  return {
    address: account.receiveAddress().toString(node.network),
    seed: wallet.master.mnemonic.toString()
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

export async function revealSeed(req, res) {
  try {
    const wallet = await _getWallet(req.node);

    // clone the encrypted version of the key below in order to check the password.
    // we use a clone since the wallet by default doesn't do anything with subsequent
    // calls to unlock() after the wallet is already unlocked.
    const currKey = wallet.master;
    const clonedKey = new MasterKey({
      encrypted: true,
      iv: currKey.iv,
      ciphertext: currKey.ciphertext,
      alg: currKey.alg,
      rounds: currKey.rounds,
      n: currKey.n,
      r: currKey.r,
      p: currKey.p
    });
    await clonedKey.unlock(req.payload, 500);
    res.send({
      id: req.id,
      payload: {
        mnemonic: wallet.master.mnemonic.toString()
      }
    })
  } catch (err) {
    let message = err.message;
    if (err.message.match(/bad decrypt/i)) {
      message = 'Invalid passphrase.';
    } else if (err.message.match(/no passphrase/i)) {
      message = 'No passphrase provided.';
    }

    res.send({
      id: req.id,
      error: true,
      payload: message
    })
  }
}

export async function importSeed(req, res) {
  try {
    const existing = await _getWallet(req.node);
    if (existing) {
      await _removeWallet(req.node);
    }

    const {wdb} = req.node.require('walletdb');
    const wallet = await wdb.create({
      id: 'extension',
      passphrase: req.passphrase,
      mnemonic: req.mnemonic
    });
    await wallet.master.unlock(req.passphrase, ONE_DAY);
    res.send({ id: req.id });
  } catch (e) {
    res.send({
      id: req.id,
      error: true,
      payload: e.message
    })
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
  const shouldResolveOnHandshake = localStorage.getItem('shouldResolveOnHandshake');
  localStorage.setItem('shouldResolveOnHandshake', shouldResolveOnHandshake ? '' : '1');
  toggleResolution();
}

export async function rpcRequest(req, res) {
  const { node } = req;
  const { method, params } = req.payload;

  try {
    const result = await node.rpc.execute({ method, params });
    res.send({
      id: req.id,
      payload: result,
    });
  } catch (err) {
    res.send({
      id: req.id,
      error: true,
      payload: err.message,
    });
  }

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

async function _removeWallet(node) {
  const { wdb } = node.require('walletdb');

  await wdb.db.close();
  await wdb.db.destroy();
  await wdb.db.open();
}