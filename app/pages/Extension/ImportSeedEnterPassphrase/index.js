import React, { Component } from 'react';
import { connect } from 'react-redux';
import './importenter.scss';
import PropTypes from 'prop-types';
import WizardHeader from '../../../components/WizardHeader';

@connect(
  state => ({}),
  dispatch => ({})
)
export default class ImportSeedEnterPassphrase extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  render() {
    const {currentStep, totalSteps, onBack} = this.props;
    const importPlaceholder = 'Enter or paste your mnemonic seed phrase here';

    return (
      <div className="create-password">
        <WizardHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} onCancel={this.props.onCancel} />
        <div className="create-password__content">
          <div className='header_text'>
            Sign in with your seed phrase
          </div>

          <div className='subheader_text import_enter_warning_text'>
            <div>
              This is the 24-word phrase that was given to you when your wallet was created.
            </div>
            <div className='subheader_text_separator'>
            </div>
            <div>
              Faucet participants: this phrase was given to you when you signed up.
            </div>
          </div>
          <div>
            <textarea className='import_enter_textarea' placeholder={importPlaceholder} />
          </div>

          <button
            className="import_enter_cta"
            onClick={this.props.onNext}
          >
            Unlock funds
          </button>
        </div>
      </div>
    );
  }
}
