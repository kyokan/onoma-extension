/* eslint-disable no-use-before-define */
import * as walletTypes from '../../../app/ducks/wallet';
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

  return {
    address,
    type: EXTENSION,
    isLocked: await isWalletLocked(node),
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

export async function isWalletLocked(node) {
  const wallet = await _getWallet(node);
  try {
    await wallet.sign();
  } catch (err) {
    return /no passphrase/gi.test(err.message);
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
