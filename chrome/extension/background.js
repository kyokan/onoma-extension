/* eslint-disable no-use-before-define */
import startnode from './background/startnode';
import {
  getWallet,
  createWallet,
  unlockWallet,
  lockWallet,
  getChainInfo,
} from './background/controllers';
import {
  CREATE_WALLET,
  GET_WALLET,
  UNLOCK_WALLET,
  LOCK_WALLET,
  GET_CHAIN_INFO,
} from './background/actionTypes';

const chrome = global.chrome;

(async () => await startnode())();

// Initialize Node
onConnect(async (err, port) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return;
  }

  const node = await startnode();
  // TODO: Remove this before prod
  window.node = node;
  initControllers(node, port);
});

function initControllers(node, port) {
  const send = createSend(port);

  onMessage(port, async (err, action) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return;
    }

    const { type, payload, id } = action;
    const req = { node, type, payload, id };
    const res = { send };

    switch (type) {
      case GET_WALLET:
        // TODO: Refactor to use req/res pattern similar to unlock
        return send({
          id,
          payload: await getWallet(node),
        });
        // TODO: Refactor to use req/res pattern similar to unlock
      case CREATE_WALLET:
        try {
          return send({
            id,
            payload: await createWallet(node, payload)
          });
        } catch (error) {
          return send({
            id,
            error: true,
            payload: error.message,
          });
        }
      case UNLOCK_WALLET:
        return unlockWallet(req, res);
      case LOCK_WALLET:
        return lockWallet(req, res);
      case GET_CHAIN_INFO:
        console.log(req);
        return getChainInfo(req, res);
      default:
        return null;
    }
  });
}

function onConnect(cb) {
  try {
    chrome.extension.onConnect.addListener(port => {
      cb(null, port);
    });
  } catch (err) {
    cb(err, null);
  }
}

function onMessage(port, cb) {
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

function createSend(port) {
  return function send(response) {
    port.postMessage(JSON.stringify(response));
  };
}
