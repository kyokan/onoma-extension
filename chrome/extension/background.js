// import Logger from 'blgr';
// import SPVNode from '../../node_modules/hsd/lib/node/spvnode';
// import plugin from '../../node_modules/hsd/lib/wallet/plugin';
// import ProxySocket from './background/proxysocket';
//
// // setInterval.unref polyfill
// const _setInterval = setInterval;
//
// function Timer(t) {
//   this.t = t;
// }
//
// Timer.prototype.valueOf = function() {
//   return this.t;
// };
//
// Timer.prototype.unref = function() {
//   clearInterval(this.t);
// };
//
// window.setInterval = function(fn, timeout) {
//   return new Timer(_setInterval(fn, timeout));
// };
// // setInterval.unref polyfill
//
// const logger = new Logger({
//   level: 'debug',
//   console: true
// });
//
// const node = new SPVNode({
//   hash: true,
//   query: true,
//   prune: true,
//   network: 'testnet',
//   memory: false,
//   coinCache: 30,
//   logConsole: true,
//   workers: true,
//   workerFile: '/worker.js',
//   createSocket: (port, host) => {
//     // const proto = global.location.protocol === 'https:' ? 'wss' : 'wss';
//     // const hostname = global.location.host;
//     return ProxySocket.connect(`ws://localhost:8080`, port, host);
//   },
//   logger: logger,
//   plugins: [plugin]
// });
//
//
// const {wdb} = node.require('walletdb');
// wdb.options.witness = true;
// node.chain.on('block', console.log.bind(console));
//
// (async () => {
//   await node.ensure();
//   await node.open();
//   await node.connect();
//   node.startSync();
// })().catch(async (err) => {
//
//   // try {
//   //   await wdb.primary.createReceive();
//   //   const wallet = wdb.primary;
//   //   console.log({ wallet });
//   //   const master = wallet.master.getJSON(node.network, true);
//   //   const account = await wallet.getAccount('default');
//   //   const receive = account.receiveAddress();
//   //   const raddr = receive.toString(node.network);
//   //
//   //   let html = '';
//   //
//   //   html += 'Wallet\n';
//   //   html += `Current Address: ${raddr}\n`;
//   //   html += `Extended Private Key: ${master.key.xprivkey} \n`;
//   //   html += `Mnemonic: ${master.mnemonic.phrase}\n`;
//   //
//   //   const balance = await wallet.getBalance();
//   //
//   //   // html += `<!--Confirmed Balance: <b>${Amount.coin(balance.confirmed)}</b><br>-->`;
//   //   // html += `Unconfirmed Balance: <b>${Amount.coin(balance.unconfirmed)}</b><br>`;
//   //
//   //   const txs = await wallet.getHistory();
//   //   const det = await wallet.toDetails(txs);
//   //
//   //   html += 'TXs:\n';
//   //
//   //   console.log(html);
//   //
//   //   const text = 'getnameinfo google';
//   //   const argv = text.trim().split(/\s+/);
//   //   const method = argv.shift();
//   //   const params = [];
//   //
//   //   for (const arg of argv) {
//   //     let param;
//   //     try {
//   //       param = JSON.parse(arg);
//   //     } catch (e) {
//   //       param = arg;
//   //     }
//   //     params.push(param);
//   //   }
//   //
//   //   (async () => {
//   //     try {
//   //       const result = await node.rpc.execute({ method, params });
//   //       console.log(result)
//   //       // show(result);
//   //     } catch (e) {
//   //       // show(e);
//   //     }
//   //   })();
//   // } catch (e) {
//   //   // show(e);
//   // }
//
//
//   throw err;
// });

chrome.storage.sync.set({ password: '123457' }, () => {
  console.log('settings saved');
})

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
    port.postMessage("Hi Popup.js");
  });
})
