import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WizardHeader from '../../../components/WizardHeader';
import './importenter.scss';
import classNames from 'classnames';

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
    const { currentStep, totalSteps, onBack, onNext } = this.props;
    const importPlaceholder = 'Enter or paste your mnemonic seed phrase here';

    return (
      <div className="create-password">
        <WizardHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={onBack}
          onCancel={this.props.onCancel}
        />
        <div className="create-password__content">
          <div className="import-header-text">
            Import your recovery phrase
          </div>

          <div className="import_warning_text">
            Enter your 24 word seed phrase that was assigned to you when you created your previous wallet.
          </div>
          <div className="import-learn-more-text">
            Learn more
          </div>
          <div className="import-enter__textarea-container">
            <textarea
              className="import_enter_textarea"
              placeholder={importPlaceholder}
              value={this.state.mnemonic}
              onChange={this.onChangeMnemonic}
              autoFocus
            />
          </div>

        </div>
        <div className="create-password__footer">
          <button
            className="import_cta_button"
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
