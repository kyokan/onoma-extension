import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  currentView: 'default',
  resolverOn: false,
};

const actionsMap = {
  [ActionTypes.EXTENSION_TOGGLE_RESOLVER](state, action) {
    return state;
  },
  [ActionTypes.EXTENSION_SET_VIEW](state, action) {

    return Object.assign({},
      state,
      {
        currentView: action.view,
      }
    );
  },
};

export default function extension(state = {}, action) {
  const reduceFn = actionsMap[action.type];
  let finalState = state;
  if (reduceFn) {
    finalState = reduceFn(state, action);
  };

  return finalState;
}
