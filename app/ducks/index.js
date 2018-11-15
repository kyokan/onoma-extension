import { combineReducers } from 'redux';
import extension from './extension';
import wallet from './wallet';
import chain from './chain';

export default combineReducers({
  extension,
  wallet,
  chain,
});
