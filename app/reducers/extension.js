import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  currentView: 'default',
  resolverOn: false,
};

const actionsMap = {
  [ActionTypes.EXTENSION_TOGGLE_RESOLVER](state, action) {
    console.log({state});
    return state;
  },
  [ActionTypes.EXTENSION_SET_VIEW](state, action) {
    console.log({state});
    return state;
  },
};

export default function extension(state = {}, action) {
  console.log('state before', state, action);
  const reduceFn = actionsMap[action.type];
  console.log('reduceFn:', reduceFn);
  console.log('state after', state, action);
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
