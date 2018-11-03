import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import './access.scss';

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
      <div className='extension_primary_section'>
        <div className='subheader_text clickable' onClick={() => {this.props.actions.setView('default')}}>
          <span className='directional_symbol access_back'>
            <i className="arrow left"></i>
          </span>
          <span>
            Back
          </span>
        </div>
        <div className='extension_primary_line_break access_line_break'> </div>
        <div className='header_text'> How would you like to access your wallet? </div>
        <button className='access_cta_button' onClick={() => {this.props.actions.setView('create-password')}}>
          <div className='access_cta_primary_text'> Connect Ledger Device </div>
          <div className='access_cta_secondary_text'> Recommended </div>
        </button>

        <button className='access_cta_button' onClick={() => {this.props.actions.setView('create-password')}}>
          <div className='access_cta_primary_text'> Import Seed Phrase </div>
          <div className='access_cta_secondary_text'> Not Secure </div>
        </button>

        <button className='access_cta_button' onClick={() => {this.props.actions.setView('create-password')}}>
          <div className='access_cta_primary_text'> Create A New Wallet </div>
          <div className='access_cta_secondary_text'> Not Secure </div>
        </button>
      </div>
    );
  }
}
