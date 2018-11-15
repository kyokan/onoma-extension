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
import AccountLogin from './AccountLogin';

import './App.scss';

@connect(
  state => ({
    currentView: state.extension.currentView,
    address: state.wallet.address,
    initialized: state.wallet.initialized,
    isLocked: state.wallet.isLocked,
  }),
  dispatch => ({
    fetchWallet: () => dispatch(walletActions.fetchWallet()),
    setWallet: ({ address, type, isLocked }) => {
      dispatch(walletActions.setWallet({ address, type, isLocked }));
    },
  })
)
export default class App extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    fetchWallet: PropTypes.func.isRequired,
    currentView: PropTypes.string,
    initialized: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchWallet();
  }

  render() {
    const { currentView, address, initialized, isLocked } = this.props;

    if (!initialized) {
      return <noscript />;
    }

    if (isLocked) {
      return <AccountLogin />;
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
