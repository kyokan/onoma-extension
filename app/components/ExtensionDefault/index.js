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
          <div className='subheader_text'> Take control of your Handshake coins and domain names. </div>
          <button className='extension_cta_button' onClick={() => {this.props.actions.setView('create-password')}}> Get Started </button>
        </div>
        <div className='extension_secondary_section'>
          <div onClick={actions.openExtensionInBrowser}> Browse Domains </div>
          <div> Information </div>
          <div></div>

          <div> Resolve on Handshake </div>
          <div> Version 1.0 </div>
          <div> Current Height: </div>
        </div>

      </div>
    );
  }
}
