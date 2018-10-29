import * as types from '../constants/ActionTypes';

export function setView(view) {
  return { type: types.EXTENSION_SET_VIEW, view };
}

export function toggleResolver() {
  return { type: types.EXTENSION_TOGGLE_RESOLVER };
}

// export function createAccountStart() {
//   return { type: types.CREATE_ACCOUNT_START};
// }

// export function createAccountEnd() {
//   return { type: types.CREATE_ACCOUNT_END};
// }
