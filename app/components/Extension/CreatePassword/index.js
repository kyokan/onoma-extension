import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import StatusBar from '../../StatusBar/index.js';
import './create.scss';

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
        <div className='subheader_text clickable' onClick={() => {this.props.actions.setView('default')}}>
          <span className='directional_symbol create_back'>
            <i className="arrow left"></i>
          </span>
          <span>
            Back
          </span>
        </div>

        <div className='create_status_bar'>
          <StatusBar currentStep={2} totalSteps={5} />
        </div>

        <div className='header_text'> Encrypt your wallet with a password </div>
        <div>
          <input className='create_password_input' placeholder='Enter passphrase'></input>
        </div>
        <div>
          <input className='create_password_input' placeholder='Confirm passphrase'></input>
        </div>
        <button className='extension_cta_button create_cta' onClick={() => {this.props.actions.setView('access-funds-show-options')}}> Next </button>
      </div>
    );
  }
}
