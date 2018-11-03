import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../actions/extension.js';
import './extensionDefault.scss';

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
          <div className='header_text'>onoma wallet</div>
          <div className='subheader_text'>Take control of your Handshake coins and domain names.</div>
          <button className='extension_cta_button' onClick={() => {this.props.actions.setView('create-password')}}>Get Started</button>
          <div className='extension_primary_line_break'> </div>
        </div>
        <div className='extension_primary_section'>
          <div className='extension_option_text' onClick={actions.openExtensionInBrowser}> Browse Domains </div>
          <div className='extension_option_text'> Information </div>
          <div className='extension_option_text'> Help </div>
          <div>
            <span>
              <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
              </label>
            </span>
            <span>Resolve on Handshake</span>
          </div>
          <div className='extension_backgroud_text'>Version 1.0</div>
          <div className='extension_backgroud_text'>Current Height: #3952</div>
          <div className='extension_backgroud_text'>Hash: 0fj48fj30fuw-0fj48fj30fuw-0fj48fj30fuw</div>
        </div>

      </div>
    );
  }
}
