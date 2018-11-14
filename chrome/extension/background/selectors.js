export async function getWallet(node) {
  const { wdb } = node.require('walletdb');
  const wallet = await wdb.get('extension');

  if (!wallet) {
    return {};
  }

  const account = await wallet.getAccount('default');

  if (!account) {
    return {};
  }

  const receive = account.receiveAddress();
  const address = receive.toString(node.network);

  return { address };
}
