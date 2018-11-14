/* eslint-disable no-use-before-define */
import startnode from './background/startnode';
// import selectors from './background/selectors';
const chrome = global.chrome;

// Initialize Node
(async function startBackground() {
  const node = await startnode();
  // eslint-disable-next-line no-console
  initControllers(node).catch(console.error.bind(console));
}());

async function initControllers(node) {
  const port = await connect();
  listenToPort(port, (err, action) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return;
    }

    const { type, payload } = action;

    switch (type) {
      // case ''
    }
  });
}

function connect() {
  return new Promise((resolve, reject) => {
    try {
      chrome.extension.onConnect.addListener(port => {
        resolve(port);
      });
    } catch (err) {
      reject(err);
    }
  });
}

function listenToPort(port, cb) {
  try {
    port.onMessage.addListener(async msg => {
      const action = await parseAction(msg);
      cb(null, action);
    });
  } catch (err) {
    cb(err, null);
  }
}

function parseAction(action) {
  try {
    return JSON.parse(action);
  } catch (err) {
    return {};
  }
}

//
// startnode()
// .then(async node => {
//   let wallet, account, raddr = '';
//
//   const { wdb } = node.require('walletdb');
//
//   wallet = await wdb.get('extension');
//
//   if (wallet) {
//     account = await wallet.getAccount('default');
//     if (account) {
//       const receive = account.receiveAddress();
//       raddr = receive.toString(node.network);
//     }
//   }
//
//   chrome.extension.onConnect.addListener(port => {
//     port.onMessage.addListener(async msg => {
//       try {
//         const { type, payload, id } = JSON.parse(msg);
//         switch (type) {
//           case 'test':
//             return port.postMessage(JSON.stringify({
//               id: id,
//               payload: `this is from ${id}`,
//             }));
//           case 'getState':
//             return port.postMessage(JSON.stringify({
//               id: id,
//               payload: {
//                 address: raddr,
//               },
//             }));
//           case 'createWallet':
//             try {
//               if (!payload) {
//                 throw new Error('No passphrase');
//               }
//
//               wallet = await wdb.create({ id: 'extension', passphrase: payload });
//               await wallet.master.unlock(payload, 5000);
//               wallet.master.mnemonic.toSeed(payload);
//               account = await wallet.getAccount('default');
//               raddr = account.receiveAddress().toString(node.network);
//
//               return port.postMessage(JSON.stringify({
//                 id: id,
//                 payload: {
//                   address: raddr,
//                   seed: wallet.master.mnemonic.phrase,
//                 },
//               }));
//             } catch (err) {
//               return port.postMessage(JSON.stringify({
//                 id: id,
//                 error: true,
//                 payload: err.message,
//               }));
//             }
//
//         }
//       } catch (err) {
//         console.error(err);
//       }
//       // port.postMessage("Hi Popup.js");
//     });
//   });
// });
