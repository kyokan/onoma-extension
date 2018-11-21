import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import SubHeader from '../../components/SubHeader';
import Account from './Account';
import Auction from './Auction';
import GetCoins from './GetCoins';
import './window.scss';
import * as walletActions from '../../ducks/wallet';
import * as chainActions from '../../ducks/chain';
import AccountLogin from '../Extension/AccountLogin';
import Settings from './Settings';


@connect(
  state => ({
    initialized: state.wallet.initialized,
    isLocked: state.wallet.isLocked,
    address: state.wallet.address,
  }),
  dispatch => ({
    fetchWallet: () => dispatch(walletActions.fetchWallet()),
    getChainInfo: () => dispatch(chainActions.getChainInfo()),
  }),
)
export default class WindowApp extends Component {
  static propTypes = {
    fetchWallet: PropTypes.func.isRequired,
    getChainInfo: PropTypes.func.isRequired,
    initialized: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.props.fetchWallet();
    this.props.getChainInfo();
  }

  render() {
    const { initialized, isLocked, address } = this.props;

    if (!initialized) {
      return <noscript />;
    }

    // TODO: Add Desktop Onboarding
    if (!address) {
      return <div>Create Account First</div>
    }

    if (isLocked) {
      return <AccountLogin className="window-app__login"/>;
    }

    return (
      <HashRouter hashType="slash">
        <div className="window-app">
          <SubHeader />
          <div className="window-app__content">
            <Switch>
              <Route path="/account" component={Account} />
              <Route path="/send" component={Account} />
              <Route path="/receive" component={Account} />
              <Route path="/get_coins" component={GetCoins} />
              <Route path="/settings" component={Settings} />
              <Route path="/domain/:name?" component={Auction} />
              <Redirect to="/account" />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}
