// Constants
export const NONE = 'NONE';
export const LEDGER = 'LEDGER';
export const IMPORTED = 'IMPORTED';
export const EXTENSION = 'EXTENSION';

const SET_WALLET = 'app/wallet/setWallet';

const initialState = {
  address: '',
  type: NONE,
  isLocked: true,
  initialized: false,
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
    default:
      return state;
  }
}
