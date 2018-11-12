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

        <div className='login_status_bar'>
          <StatusBar currentStep={2} totalSteps={5} />
        </div>

        <div className='header_text'> Set up a password </div>
        <div>
          <input className='login_password_input' placeholder='Password (min. 8 characters)'></input>
        </div>
        <div>
          <input className='login_password_input' placeholder='Confirm password'></input>
        </div>
        <button className='extension_cta_button create_cta' onClick={() => {this.props.actions.setView('access-funds-show-options')}}> Next </button>
      </div>
    );
  }
}
