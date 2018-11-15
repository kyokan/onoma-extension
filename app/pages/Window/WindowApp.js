import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import SubHeader from '../../components/SubHeader';
import Account from './Account';
import Auction from './Auction';
import GetCoins from './GetCoins';
import './window.scss';
import * as walletActions from '../../ducks/wallet';
import * as chainActions from '../../ducks/chain';


@connect(
  null,
  dispatch => ({
    fetchWallet: () => dispatch(walletActions.fetchWallet()),
    getChainInfo: () => dispatch(chainActions.getChainInfo()),
  }),
)
export default class WindowApp extends Component {
  static propTypes = {
    fetchWallet: PropTypes.func.isRequired,
    getChainInfo: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchWallet();
    this.props.getChainInfo();
  }

  render() {
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
              <Route path="/settings" component={() => <div>Settings</div>} />
              <Route path="/auction" component={Auction} />
              <Redirect to="/account" />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}
