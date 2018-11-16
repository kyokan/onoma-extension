import client from '../utils/client';
import * as rpc from '../../chrome/extension/background/actionTypes';

const SET_NAME_INFO = 'app/domain/setNameInfo';

const initialState = {};


const AUCTION_STATE = {
  NULL: null,
  BIDDING: 'BIDDING',
  REVEAL: 'REVEAL',
  CLOSED: 'CLOSED',
  REVOKED: 'REVOKED',
  TRANSFER: 'TRANSFER',
};

function makeInfo(opts) {
  return {
    state: AUCTION_STATE.NULL,
    owner: null,
    ...opts || {},
  };
}

export const getNameInfo = tld => async dispatch => {
  return client
    .dispatch({
      type: rpc.RPC_REQUEST,
      payload: {
        method: 'getnameinfo',
        params: [ tld ],
      }
    })
    .then(({ info, start }) => {
      dispatch({
        type: SET_NAME_INFO,
        payload: {
          info: makeInfo(info),
          start,
          name: tld,
        },
      });
    });
};

export default function domainsReducer(state = initialState, { payload, type }) {
  switch (type) {
    case SET_NAME_INFO:
      return {
        ...state,
        [payload.name]: {
          info: payload.info,
          start: payload.start,
        },
      };
    default:
      return state;
  }
}
