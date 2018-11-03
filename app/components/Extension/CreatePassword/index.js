import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class CreatePassword extends Component {

  static propTypes = {};

  render() {

    return (
      <div>
        <div onClick={() => {this.props.actions.setView('default')}}> Back </div>
        <div> Encrypt your wallet with a password </div>
        <div> New password </div>
        <div> Confirm password </div>
        <button onClick={() => {this.props.actions.setView('access-funds-show-options')}}> Next </button>
      </div>
    );
  }
}
