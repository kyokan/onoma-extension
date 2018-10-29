import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../actions/extension.js';
console.log('actions:', actions);

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {};

  render() {

    return (
      <div>
        <div> Back </div>
        <div> Encrypt your wallet with a password </div>
        <input> New password </input>
        <input> Confirm password </input>
        <button> Next </button>
      </div>
    );
  }
}
