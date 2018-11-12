import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/pages/Root';

chrome.storage.local.get('state', (obj) => {
  // const { state } = obj;
  // const initialState = JSON.parse(state || '{}');
  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore()} />,
    document.querySelector('#root')
  );

  var port = chrome.extension.connect({
    name: "Sample Communication"
  });
  port.postMessage("Hi BackGround");
  port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
  });

});
