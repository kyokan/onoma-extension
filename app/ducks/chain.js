import client from '../utils/client';
import * as rpc from '../../chrome/extension/background/actionTypes';

const SET_CHAIN_INFO = 'app/chain/setChainInfo';

const initialState = {
  height: 0,
  currentHash: '',
};

export const getChainInfo = () => dispatch => {
  client
    .dispatch({ type: rpc.GET_CHAIN_INFO })
    .then(({ height, currentHash }) => dispatch({
      type: SET_CHAIN_INFO,
      payload: { height, currentHash },
    }));
};

export default function chainReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CHAIN_INFO:
      return {
        ...state,
        height: payload.height,
        currentHash: payload.currentHash,
      };
    default:
      return state;
  }
}
