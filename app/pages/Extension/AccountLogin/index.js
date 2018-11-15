import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../ducks/extension';
// import StatusBar from '../../../components/StatusBar/index.js';
import './login.scss';

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
      <div className='extension_primary_section'>
        <div className='header_text'> Log in to your wallet </div>
        <div>
          <input className='login_password_input' placeholder='Your password'></input>
        </div>
        <button className='extension_cta_button login_cta' onClick={() => {this.props.actions.setView('default')}}> Unlock Wallet </button>

        <div className='login_options_wrapper'>
          <div className='login_subheader_text'> Forgot your password? </div>
          <div className='login_subheader_text login_subheader_text__accent'> Restore with your seed phrase </div>
          {/*Redirect to Seed Phrase Recovery Screen for Existing Account*/}
        </div>

        <div className='login_background_text_wrapper'>
          <div className='extension_background_text login_background'>Current Height: #3952</div>
          <div className='extension_background_text login_background'>Current Hash: 0fj48fj30fuw-0fj48fj30fuw-0fj48fj30fuw</div>
        </div>

        <div className='extension_primary_line_break login_line_break'> </div>

        <div className='login_resolver_switch'>
          <span>
            <label className='switch'>
              <input type='checkbox'/>
              <span className='slider round'></span>
            </label>
          </span>
          <span className='switch-text login_switch_text'>Resolve on Handshake</span>
        </div>
      </div>
    );
  }
}
