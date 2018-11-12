import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/pages/Root';
import createStore from '../../app/store/configureStore';

chrome.storage.local.get('state', () => {
  ReactDOM.render(
    <Root store={createStore()} />,
    document.querySelector('#root')
  );
});
