import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
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
          <Header />
          <SubHeader />
          <div className="window-app__content">
            <Switch>
              <Route path="/account" component={() => <div>Account</div>} />
              <Route path="/get_coins" component={() => <div>Get Coins</div>} />
              <Route path="/settings" component={() => <div>Settings</div>} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}
