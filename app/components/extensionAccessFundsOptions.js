import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../actions/extension.js';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {};

  render() {

    return (
      <div>
        <div onClick={() => {this.props.actions.setView('default')}}> Back </div>
        <div> How would you like to access your funds? </div>
        <div> Connect Your Ledger </div>
        <div> Import seed from Faucet </div>
        <div> GitHub SSH proof </div>
        <div> Add funds later </div>
      </div>
    );
  }
}
