import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import SubHeader from '../../components/SubHeader';
import Account from '../Account';
import './window.scss';

@connect(
  state => ({
  }),
  dispatch => ({
  }),
)
export default class WindowApp extends Component {
  static propTypes = {
  };

  render() {
    return (
      <HashRouter hashType="slash">
        <div className="window-app">
          <SubHeader />
          <div className="window-app__content">
            <Switch>
              <Route path="/account" component={Account} />
              <Route path="/get_coins" component={() => <div>Get Coins</div>} />
              <Route path="/settings" component={() => <div>Settings</div>} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}
