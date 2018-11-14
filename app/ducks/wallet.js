// Constants
const NONE = 'NONE';
const LEDGER = 'LEDGER';
const IMPORTED = 'IMPORTED';
const EXTENSION = 'NORMAL';

const initialState = {
  address: '',
  type: NONE,
};

export default function walletReducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
