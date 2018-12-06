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
import CreateNewAccount from '../Extension/CreateNewAccount';
import ExtensionWrapper from '../Extension/ExtensionWrapper';
import FundAccessOptions from '../Extension/FundAccessOptions';
import ImportSeedFlow from '../Extension/ImportSeedFlow';
import Footer from './Footer';


@connect(
  state => ({
    initialized: state.wallet.initialized,
    isLocked: state.wallet.isLocked,
    address: state.wallet.address,
  }),
  dispatch => ({
    startWalletPoller: () => dispatch(walletActions.startWalletPoller()),
    startChainInfoPoller: () => dispatch(chainActions.startChainInfoPoller()),
  }),
)
export default class WindowApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  static propTypes = {
    startWalletPoller: PropTypes.func.isRequired,
    startChainInfoPoller: PropTypes.func.isRequired,
    initialized: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
  };

  async componentDidMount() {
    try {
      await this.props.startWalletPoller();
      await this.props.startChainInfoPoller();
    } catch (e) {
    }

    this.setState({
      isLoading: false
    });
  }

  render() {
    return (
      <HashRouter hashType="slash">
        <div className="window-app">
          <SubHeader />
          <div className="window-app__content">
            {this.renderRoutes()}
          </div>
          <div className="window-app__footer">
            <Footer />
          </div>
        </div>
      </HashRouter>
    );
  }

  renderRoutes() {
    if (this.state.isLoading) {
      return null;
    }

    if (this.props.isLocked || !this.props.initialized) {
      return (
        <Switch>
          <Route path="/login" render={() => <AccountLogin className="window-app__login" />} />
          <Route path="/funding-options" render={this.renderWrapper(FundAccessOptions)} />
          <Route path="/new-wallet" render={this.renderWrapper(CreateNewAccount)} />
          <Route path="/import-seed" render={this.renderWrapper(ImportSeedFlow)} />
          {this.renderDefault()}
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/send" component={Account} />
        <Route path="/receive" component={Account} />
        <Route path="/get_coins" component={GetCoins} />
        <Route path="/settings" component={Settings} />
        <Route path="/domain/:name?" component={Auction} />
        {this.renderDefault()}
      </Switch>
    );
  }

  renderDefault = () => {
    if (!this.props.initialized) {
      return <Redirect to="/funding-options" />
    }

    if (this.props.isLocked) {
      return <Redirect to="/login" />
    }

    return <Redirect to="/account" />
  };

  renderWrapper = (c) => {
    const Component = c;
    return () => (
      <ExtensionWrapper inWindow>
        <Component />
      </ExtensionWrapper>
    );
  }
}
