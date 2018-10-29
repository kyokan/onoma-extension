import * as types from '../constants/ActionTypes';
import extension from 'extensionizer';

export function setView(view) {
  return { type: types.EXTENSION_SET_VIEW, view };
}

export function toggleResolver() {
  return { type: types.EXTENSION_TOGGLE_RESOLVER };
}

export function openExtensionInBrowser(route = null, queryString = null) {
  let extensionURL = extension.runtime.getURL('window.html')
  // if (queryString) {
  //   extensionURL += `?${queryString}`
  // }

  // if (route) {
  //   extensionURL += `#${route}`
  // }
  console.log('extensionURL:', extensionURL);
  extension.tabs.create({ url: extensionURL })
}

export default {
  setView,
  toggleResolver,
  openExtensionInBrowser,
}
// export function createAccountStart() {
//   return { type: types.CREATE_ACCOUNT_START};
// }

// export function createAccountEnd() {
//   return { type: types.CREATE_ACCOUNT_END};
// }
