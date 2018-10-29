import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  currentView: 'default',
  resolverOn: false,
};

const actionsMap = {
  [ActionTypes.EXTENSION_TOGGLE_RESOLVER](state, action) {
    cconsole.log("TOGGLE_RESOLVER");
    console.log({state});
    return state;
  },
  [ActionTypes.EXTENSION_SET_VIEW](state, action) {
    console.log("SET_VIEW", state, action);

    return Object.assign(state,
      {
        currentView: action.view,
      }
    );
  },
};

export default function extension(state = {}, action) {
  console.log('state before', state, action);
  const reduceFn = actionsMap[action.type];
  console.log('reduceFn:', reduceFn);
  let finalState = state;
  if (reduceFn) {
    finalState = reduceFn(state, action);
  };
  console.log('state after', finalState);

  return finalState;
}
