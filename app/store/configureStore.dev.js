import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from '../ducks';

const enhancer = compose(
  applyMiddleware(thunk, logger),
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../ducks', () => {
      const nextRootReducer = require('../ducks');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
