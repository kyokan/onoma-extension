import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import StatusBar from '../../StatusBar/index.js';
import './importledger.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)

export default class ImportSeedEnterPassphrase extends Component {

  static propTypes = {};

  state = {
    agreementConfirmed: false,
  }

  render() {
    const { agreementConfirmed } = this.state;
    const currentStep = 2;
    const totalSteps = 3;
    const steps = agreementConfirmed ? currentStep + 1 : currentStep;
    const importPlaceholder = 'Enter or paste your mnemonic seed phrase here';

    return (
      <div className='extension_primary_section'>
        <div className='import_enter_back_button subheader_text clickable' onClick={() => {this.props.actions.setView('default')}}>
          <span className='directional_symbol import_enter_back'>
            <i className="arrow left"></i>
          </span>
          <span>
            Back
          </span>
        </div>
        <div className='import_enter_status_bar'>
          <StatusBar currentStep={steps} totalSteps={totalSteps} />
        </div>
        <div className='header_text'>
          Back up your secret seed phrase on a hardware device
        </div>

        <div className='subheader_text import_enter_warning_text'>
          <div>
            It is highly recommended that you invest in a hardware device to safely and securely manage your funds.
          </div>
        </div>

        <div>
          <textarea className='import_enter_textarea' placeholder={importPlaceholder} />
        </div>

        <button
          className={classNames(['import_enter_cta', agreementConfirmed ? 'import_enter_cta_button__active' : 'import_enter_cta_button'])}
          onClick={() => {this.props.actions.setView('default')}}
        >
          Buy Ledger Nano S
        </button>
      </div>
    );
  }
}
