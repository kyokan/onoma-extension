import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import PropTypes from 'prop-types';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
