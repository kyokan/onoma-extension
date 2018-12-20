import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import * as chainActions from '../../ducks/chain';
import Home from './Home';


import './App.scss';

@connect(
  null,
  dispatch => ({
    startChainInfoPoller: () => dispatch(chainActions.startChainInfoPoller()),
  }),
)
export default class App extends Component {
  static propTypes = {
    startChainInfoPoller: PropTypes.func.isRequired,
  };

  async componentWillMount() {
    await this.props.startChainInfoPoller();
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </MemoryRouter>
    );
  }
}
