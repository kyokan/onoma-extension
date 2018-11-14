// Constants
export const NONE = 'NONE';
export const LEDGER = 'LEDGER';
export const IMPORTED = 'IMPORTED';
export const EXTENSION = 'EXTENSION';

const SET_WALLET = 'app/wallet/setWallet';

const initialState = {
  address: '',
  type: NONE,
  initialized: false,
};

export const setWallet = ({ address = '', type = NONE }) => {
  return {
    type: SET_WALLET,
    payload: { address, type },
  };
};

export default function walletReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_WALLET:
      return {
        ...state,
        address: payload.address,
        type: payload.type,
        initialized: true,
      };
    default:
      return state;
  }
}
