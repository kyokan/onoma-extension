import React from 'react';
import ReactDOM from 'react-dom';
import WindowRoot from '../../app/containers/Window/WindowRoot';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <WindowRoot store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
