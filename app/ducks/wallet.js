/* eslint-disable no-use-before-define */
// Constants
import client from '../utils/client';
import * as rpc from '../../chrome/extension/background/actionTypes';

export const NONE = 'NONE';
export const LEDGER = 'LEDGER';
export const IMPORTED = 'IMPORTED';
export const EXTENSION = 'EXTENSION';

const SET_WALLET = 'app/wallet/setWallet';
const UNLOCK_WALLET = 'app/wallet/unlockWallet';
const LOCK_WALLET = 'app/wallet/lockWallet';

const initialState = {
  address: '',
  type: NONE,
  isLocked: true,
  initialized: false,
};

export const fetchWallet = () => dispatch => {
  client.dispatch({ type: rpc.GET_WALLET })
    .then(({ address, type, isLocked }) => dispatch(setWallet({ address, type, isLocked })));
};

export const setWallet = ({ address = '', type = NONE, isLocked = false }) => {
  return {
    type: SET_WALLET,
    payload: {
      address,
      type,
      isLocked,
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

export default function walletReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_WALLET:
      return {
        ...state,
        address: payload.address,
        type: payload.type,
        isLocked: payload.isLocked,
        initialized: true,
      };
    case UNLOCK_WALLET:
      return { ...state, isLocked: false };
    case LOCK_WALLET:
      return { ...state, isLocked: true };
    default:
      return state;
  }
}
