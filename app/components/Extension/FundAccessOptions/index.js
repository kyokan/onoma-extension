import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import '../extension.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class FundAccessOptions extends Component {

  static propTypes = {};

  render() {

    return (
      <div>
        <div className='extension_option_text' onClick={() => {this.props.actions.setView('default')}}> Back </div>
        <div className='extension_primary_line_break'> </div>
        <div className='header_text'> How would you like to access your funds? </div>
        <div> Connect Your Ledger </div>
        <div> Import seed from Faucet </div>
        <div> GitHub SSH proof </div>
        <div> Add funds later </div>
      </div>
    );
  }
}
