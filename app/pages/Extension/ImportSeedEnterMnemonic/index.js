import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WizardHeader from '../../../components/WizardHeader';
import './importenter.scss';

export default class ImportSeedEnterMnemonic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mnemonic: ''
    };
  }

  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  onChangeMnemonic = (e) => {
    this.setState({
      mnemonic: e.target.value,
    });
  };

  render() {
    const {currentStep, totalSteps, onBack, onNext} = this.props;
    const importPlaceholder = 'Enter or paste your mnemonic seed phrase here';

    return (
      <div className="create-password">
        <WizardHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} onCancel={this.props.onCancel} />
        <div className="create-password__content">
          <div className="header_text">
            Sign in with your seed phrase
          </div>

          <div className="subheader_text import_enter_warning_text">
            <div>
              This is the 12-word phrase that was given to you when your wallet was created.
            </div>
            <div>
              Faucet participants: this phrase was given to you when you signed up.
            </div>
          </div>
          <div>
            <textarea
              className="import_enter_textarea"
              placeholder={importPlaceholder}
              value={this.state.mnemonic}
              onChange={this.onChangeMnemonic}
              autoFocus
            />
          </div>
          <button
            className="import_enter_cta"
            onClick={() => onNext(this.state.mnemonic)}
            disabled={this.disableButton()}
          >
            Unlock funds
          </button>
        </div>
      </div>
    );
  }

  disableButton() {
    return this.state.mnemonic.trim().split(' ').length !== 12
  }
}
