import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import '../extension.scss';
import './loggedin.scss';

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
        <div className='extension_primary_section'>
          <div className='header_text account_header'>handshake wallet</div>

          <div className='extension_primary_line_break account_line_break'> </div>

          <div className='extension_option_text account_option'> Send Funds </div>
          <div className='extension_option_text account_option'> Receive Funds </div>

          <div className='extension_primary_line_break account_line_break'> </div>

          <div className='extension_option_text account_option' onClick={actions.openExtensionInBrowser}> Browse Domains </div>
          <div className='extension_option_text account_option'> Information </div>
          <div className='extension_option_text account_option'> Help </div>

          <div className='extension_primary_line_break account_line_break'> </div>

          <div className='account_resolver_switch'>
            <span>
              <label className='switch'>
                <input type='checkbox'/>
                <span className='slider round'></span>
              </label>
            </span>
            <span className='switch-text'>Resolve on Handshake</span>
          </div>

          <div className='account_background_text_wrapper'>
            <div className='extension_background_text account_background'>Current Height: #3952</div>
            <div className='extension_background_text account_background'>Current Hash: 0fj48fj30fuw-0fj48fj30fuw-0fj48fj30fuw</div>
          </div>
        </div>
      </div>
    );
  }
}
