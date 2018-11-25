import React, { Component } from 'react';
import { ContentArea } from '../ContentArea';
import Dropdown from '../../../components/Dropdown';
import './index.scss';
import { Route, Switch, Link } from 'react-router-dom';
import AccountIndexModal from './AccountIndexModal';
import RevealSeedModal from './RevealSeedModal';
import InterstitialWarningModal from './InterstitialWarningModal';

export default class Settings extends Component {
  render() {
    return (
      <ContentArea title="Settings">
        <div className="settings__label">
          Network
        </div>
        <div className="settings__dropdown">
          <Dropdown reversed items={[
            {
              label: 'Mainnet',
            },
            {
              label: 'Testnet',
            }
          ]}/>
        </div>
        <div className="settings__section-head">
          Your current account
        </div>
        <div className="settings__hd-path">
          m / 44' / 5353' / 0
        </div>
        <div className="settings__balance">
          0.00000 HNS
        </div>
        <ul className="settings__links">
          <li><Link to="/settings/account-index">Change account index</Link></li>
          <li><a href="#">Log out</a></li>
        </ul>
        <div className="settings__section-head">
          Your recovery seed phrase
        </div>
        <ul className="settings__links">
          <li><Link to="/settings/reveal-seed">Reveal</Link></li>
        </ul>
        <div className="settings__section-head">
          Reset your account
        </div>
        <ul className="settings__links">
          <li><a href="#">Connect Ledger device</a></li>
          <li><Link to="/settings/import-seed">Import recovery seed phrase</Link></li>
          <li><Link to="/settings/new-wallet">Create a new wallet</Link></li>
        </ul>
        <Switch>
          <Route path="/settings/account-index" component={AccountIndexModal} />
          <Route path="/settings/import-seed" render={() => <InterstitialWarningModal nextRoute="/account" />} />
          <Route path="/settings/new-wallet" render={() => <InterstitialWarningModal nextRoute="/account" />} />
          <Route path="/settings/reveal-seed" component={RevealSeedModal} />
        </Switch>
      </ContentArea>
    );
  }
}