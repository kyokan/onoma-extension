import client from '../utils/client';
import * as rpc from '../../chrome/extension/background/actionTypes';
import isEqual from 'lodash.isequal';

const SET_CHAIN_INFO = 'app/chain/setChainInfo';
const START_POLLING = 'app/chain/startPolling';
const STOP_POLLING = 'app/chain/stopPolling';

const initialState = {
  height: 0,
  currentHash: '',
  chainHeight: 4110,
  synced: false,
  isPolling: false,
};

export const getChainInfo = () => (dispatch, getState) =>
  client.dispatch({ type: rpc.GET_CHAIN_INFO }).then(payload => {
    const state = getState().chain;
    const oldState = {
      height: state.height,
      currentHash: state.currentHash,
      synced: state.synced,
    };

    if (isEqual(payload, oldState)) {
      return;
    }

    dispatch({
      type: SET_CHAIN_INFO,
      payload,
    });
  });

export const startChainInfoPoller = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: START_POLLING,
    });

    const poll = async () => {
      if (!getState().chain.isPolling) {
        return;
      }

      try {
        await dispatch(getChainInfo());
      } catch (e) {
        console.error('Error fetching chain info, trying again in 1 second.');
      }

      setTimeout(poll, 1000);
    };

    await poll();
  };
};

export const stopChainInfoPoller = () => {
  return {
    type: STOP_POLLING,
  };
};

export default function chainReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CHAIN_INFO:
      return {
        ...state,
        height: payload.height,
        currentHash: payload.currentHash,
        synced: payload.synced,
      };
    case START_POLLING:
      return { ...state, isPolling: true };
    case STOP_POLLING:
      return { ...state, isPolling: false };
    default:
      return state;
  }
}
