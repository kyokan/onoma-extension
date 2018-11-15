import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/pages/Extension/Root';
import createStore from '../../app/store/configureStore';

ReactDOM.render(
  <Root store={createStore()} />,
  document.querySelector('#root')
);
