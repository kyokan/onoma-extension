import React from 'react';
import ReactDOM from 'react-dom';
import WindowRoot from '../../app/pages/Window/WindowRoot';
import createStore from '../../app/store/configureStore';

ReactDOM.render(
  <WindowRoot store={createStore()} />,
  document.querySelector('#root')
);
