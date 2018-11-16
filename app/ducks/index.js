import { combineReducers } from 'redux';
import extension from './extension';
import wallet from './wallet';
import chain from './chain';
import domains from './domains';

export default combineReducers({
  extension,
  wallet,
  chain,
  domains,
});
