import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../utils/client';
import { VIEW_TYPES } from '../../ducks/extension';
import { GET_WALLET } from '../../../chrome/extension/background/actionTypes';
import * as walletActions from '../../ducks/wallet';

import ExtensionDefault from './Default';
import Account from './Account';
import FundAccessOptions from './FundAccessOptions';
import CreateNewAccount from './CreateNewAccount';

import './App.scss';

@connect(
  state => ({
    currentView: state.extension.currentView,
    address: state.wallet.address,
    initialized: state.wallet.initialized,
  }),
  dispatch => ({
    setWallet: ({ address, type }) => dispatch(walletActions.setWallet({ address, type })),
  })
)
export default class App extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    setWallet: PropTypes.func.isRequired,
    currentView: PropTypes.string,
    initialized: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    client.dispatch({ type: GET_WALLET })
      .then(this.props.setWallet);
  }

  render() {
    const { currentView, address, initialized } = this.props;

    if (!initialized) {
      return <noscript />;
    }

    switch (currentView) {
      case VIEW_TYPES.DEFAULT:
        return address
          ? <Account />
          : <ExtensionDefault />;
      case VIEW_TYPES.CREATE_ACCOUNT_OPTIONS:
        return <FundAccessOptions />;
      case VIEW_TYPES.CREATE_NEW_ACCOUNT:
        return <CreateNewAccount />;
      default:
        return <div>View Not Yet Defined</div>;
    }
  }
}
