import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import './connect.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)

export default class ConnectLedger extends Component {

  static propTypes = {};

  state = {
    step_one: 'not_started',
    step_two: 'not_started',
    step_three: 'complete',
  };

  allStepsComplete() {
    const { step_one, step_two, step_three } = this.state;
    if (step_one === 'complete' && step_two === 'complete' && step_three === 'complete') {
      return true;
    }

    return false;
  }

  render() {
    const ctaClasses = classNames([
      'connect_cta',
      this.allStepsComplete() ? 'connect_cta__active' : false,
    ]);

    return (
      <div className='extension_primary_section'>
        <div className='subheader_text clickable' onClick={() => {this.props.actions.setView('default')}}>
          <span className='directional_symbol connect_back'>
            <i className="arrow left"></i>
          </span>
          <span>
            Back
          </span>
        </div>
        <div className='extension_primary_line_break connect_line_break'> </div>
        <div className='header_text connect_header'> Conect your Ledger </div>

        <div className='connect_status_pill_wrapper'>
          <div className='connect_status_pill'>
            <span className='connect_status_number'> 1 </span>
            <span className='connect_status_text'> Connect your Ledger wallet directly to your computer</span>
            <span className='connect_status_symbol'>
              <div className={
                classNames(
                  [
                    'ledger-circle-check-container',
                    this.state.step_one === 'complete' ? 'ledger-circle-check-container__active' : false
                  ]
                )
              }>
                <div className='ledger-circle-check-symbol'></div>
              </div>
            </span>
          </div> 

          <div className='connect_status_pill'>
            <span className='connect_status_number'> 2 </span>
            <span className='connect_status_text'> Enter your secret pin on your Ledger device</span>
            <span className='connect_status_symbol'>
              <div className={
                classNames(
                  [
                    'ledger-circle-check-container',
                    this.state.step_two === 'complete' ? 'ledger-circle-check-container__active' : false
                  ]
                )
              }>
                <div className='ledger-circle-check-symbol'></div>
              </div>
            </span>
          </div> 

          <div className='connect_status_pill'>
            <span className='connect_status_number'> 3 </span>
            <span className='connect_status_text'> Select the Handshake app on your Ledger device</span>
            <span className='connect_status_symbol'>
              <div className={
                classNames(
                  [
                    'ledger-circle-check-container',
                    this.state.step_three === 'complete' ? 'ledger-circle-check-container__active' : false
                  ]
                )
              }>
                <div className='ledger-circle-check-symbol'></div>
              </div>
            </span>
          </div> 
        </div>

        <button className={ctaClasses} onClick={() => {this.props.actions.setView('default')}}> Unlock Ledger </button>

        <div className='connect_support_cta'> Need help? Visit support page </div>
      </div>
    );
  }
}
