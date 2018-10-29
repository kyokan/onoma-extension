import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
  currentView: 'default',
  resolverOn: false,
}];

const actionsMap = {
  [ActionTypes.EXTENSION_TOGGLE_RESOLVER](state, action) {
    console.log({state});
    return [{
      extension: {
        resolverOn: !state.extension.resolverOn,
      },
      ...state.extension
    }, ...state];
  },
  [ActionTypes.EXTENSION_SET_VIEW](state, action) {
    console.log({state});
    return [{
    }, ...state];
  },
  [ActionTypes.DELETE_TODO](state, action) {
    return state.filter(todo =>
      todo.id !== action.id
    );
  },
  [ActionTypes.EDIT_TODO](state, action) {
    return state.map(todo =>
      (todo.id === action.id ?
        Object.assign({}, todo, { text: action.text }) :
        todo)
    );
  },
  [ActionTypes.COMPLETE_TODO](state, action) {
    return state.map(todo =>
      (todo.id === action.id ?
        Object.assign({}, todo, { completed: !todo.completed }) :
        todo)
    );
  },
  [ActionTypes.COMPLETE_ALL](state/*, action*/) {
    const areAllCompleted = state.every(todo => todo.completed);
    return state.map(todo => Object.assign({}, todo, {
      completed: !areAllCompleted
    }));
  },
  [ActionTypes.CLEAR_COMPLETED](state/*, action*/) {
    return state.filter(todo => todo.completed === false);
  }
};

export default function todos(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
