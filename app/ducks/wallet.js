/* eslint-disable no-use-before-define */
// Constants
import client from '../utils/client';
import * as rpc from '../../chrome/extension/background/actionTypes';
import { REVEAL_SEED } from '../../chrome/extension/background/actionTypes';

export const NONE = 'NONE';
export const LEDGER = 'LEDGER';
export const IMPORTED = 'IMPORTED';
export const EXTENSION = 'EXTENSION';

const SET_WALLET = 'app/wallet/setWallet';
const UNLOCK_WALLET = 'app/wallet/unlockWallet';
const LOCK_WALLET = 'app/wallet/lockWallet';
const REMOVE_WALLET = 'app/wallet/removeWallet';
const START_POLLING = 'app/wallet/startPolling';
const STOP_POLLING = 'app/wallet/stopPolling';

const initialState = {
  address: '',
  type: NONE,
  isLocked: true,
  initialized: false,
  balance: {
    confirmed: '0',
    unconfirmed: '0',
  },
  isPolling: false,
};

export const completeInitialization = () => dispatch => client.dispatch({ type: rpc.COMPLETE_INITIALIZATION })
  .then(() => dispatch(fetchWallet()));

export const fetchWallet = () => (dispatch) => client.dispatch({type: rpc.GET_WALLET})
  .then(({initialized, address, type, isLocked, balance}) => {
    dispatch(setWallet({
      initialized,
      address,
      type,
      isLocked,
      balance,
    }));
  });

export const startWalletPoller = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: START_POLLING,
    });

    const poll = async () => {
      if (!getState().wallet.isPolling) {
        return
      }

      try {
        await dispatch(fetchWallet());
      } catch (e) {
        console.error('Error fetching wallet, trying again in 1 second.');
      }

      setTimeout(poll, 1000);
    };
    await poll();
  }
};

export const stopWalletPoller = () => {
  return {
    type: STOP_POLLING,
  }
};

export const setWallet = ({ initialized = false, address = '', type = NONE, isLocked = false, balance = {} }) => {
  return {
    type: SET_WALLET,
    payload: {
      initialized,
      address,
      type,
      isLocked,
      balance,
    },
  };
};

export const unlockWallet = passphrase => dispatch => {
  client
    .dispatch({
      type: rpc.UNLOCK_WALLET,
      payload: passphrase,
    })
    .then(() => dispatch({ type: UNLOCK_WALLET }));
};

export const lockWallet = () => dispatch => {
  client
    .dispatch({ type: rpc.LOCK_WALLET })
    .then(() => dispatch({ type: LOCK_WALLET }));
};

export const revealSeed = (passphrase) => dispatch => {
  // note: keeping the action dispatched in case we want to
  // perform additional actions in the future on seed reveal.
  // the seed itself is kept out of state to avoid having to
  // clear it later for security reasons.
  return client
    .dispatch({ type: rpc.REVEAL_SEED, payload: passphrase })
    .then((res) => {
      dispatch({ type: REVEAL_SEED });
      return res
    });
};

export const send = ({ address, value }) => () => {
  return client
    .dispatch({
      type: rpc.SEND,
      payload: { address, value },
    })
    .then(console.log.bind(console));
};

export const removeWallet = () => dispatch => client.dispatch({ type: rpc.REMOVE_WALLET })
    .then(() => dispatch({ type: REMOVE_WALLET }));

export default function walletReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_WALLET:
      return {
        ...state,
        address: payload.address,
        type: payload.type,
        isLocked: payload.isLocked,
        balance: {
          ...state.balance,
          confirmed: payload.balance.confirmed || '',
          unconfirmed: payload.balance.unconfirmed || '',
        },
        initialized: payload.initialized,
      };
    case UNLOCK_WALLET:
      return {...state, isLocked: false};
    case LOCK_WALLET:
      return {...state, isLocked: true};
    case REMOVE_WALLET:
      return {...initialState, isPolling: state.isPolling};
    case START_POLLING:
      return {...state, isPolling: true};
    case STOP_POLLING:
      return {...state, isPolling: false};
    default:
      return state;
  }
}
