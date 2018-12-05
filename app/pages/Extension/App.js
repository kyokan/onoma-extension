import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as walletActions from '../../ducks/wallet';
import * as chainActions from '../../ducks/chain';

import ExtensionDefault from './Default';
import Account from './Account';
import FundAccessOptions from './FundAccessOptions';
import CreateNewAccount from './CreateNewAccount';
import AccountLogin from './AccountLogin';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.scss';

@connect(
  state => ({
    currentView: state.extension.currentView,
    address: state.wallet.address,
    initialized: state.wallet.initialized,
    isLocked: state.wallet.isLocked,
  }),
  dispatch => ({
    startWalletPoller: () => dispatch(walletActions.startWalletPoller()),
    startChainInfoPoller: () => dispatch(chainActions.startChainInfoPoller()),
  }),
)
export default class App extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    startWalletPoller: PropTypes.func.isRequired,
    startChainInfoPoller: PropTypes.func.isRequired,
    currentView: PropTypes.string,
    initialized: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
  };

  async componentWillMount() {
    await this.props.startWalletPoller();
    await this.props.startChainInfoPoller();
  }

  render() {
    return (
      <MemoryRouter>
        {this.renderRoutes()}
      </MemoryRouter>
    );
  }

  renderRoutes() {
    if (!this.props.initialized) {
      return (
        <Switch>
          <Route path="/new-wallet" component={CreateNewAccount} />
          <Route path="/funding-options" component={FundAccessOptions} />
          <Route path="/" component={ExtensionDefault} />
          <Redirect to="/" />
        </Switch>
      );
    }

    if (this.props.isLocked) {
      return (
        <Switch>
          <Route path="/new-wallet" component={CreateNewAccount} />
          <Route path="/funding-options" component={FundAccessOptions} />
          <Route path="/" component={AccountLogin} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/account" component={Account} />
        <Redirect to="/account" />
      </Switch>
    );
  }
}
