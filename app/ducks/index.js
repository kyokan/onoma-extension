import { combineReducers } from 'redux';
import extension from './extension';
import wallet from './wallet';

export default combineReducers({
  extension,
  wallet,
});
