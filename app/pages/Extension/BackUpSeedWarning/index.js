import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '../../../components/Checkbox';
import StatusBar from '../../../components/StatusBar';
import './index.scss';

@connect()
export default class BackUpSeedWarning extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  state = {
    hasAccepted: false,
  };

  render() {
    const {
      currentStep,
      totalSteps,
      onBack,
    } = this.props;

    return (
      <div className="backup-warning">
        <div className="backup-warning__header">
          <i className="arrow left clickable" onClick={onBack} />
          <span className="backup-warning__cancel">
            Cancel
          </span>
        </div>
        <div className="backup-warning__status-bar">
          <StatusBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className="backup-warning__content">
          <div className="backup-warning__header_text">
            Back up your recovery seed phrase
          </div>
          <div className="backup-warning__body-text">
            Your seed phrase will be generated in the next screen. It will allow you to recover your wallet if lost, stolen, or compromised.
          </div>
          <div className="backup-warning__accept-container">
            <Checkbox
              className="backup-warning__check-box"
              onChange={e => this.setState({ hasAccepted: e.target.checked })}
              checked={this.state.hasAccepted}
            />
            <div className="backup-warning__check-box-description">
              I understand that if I lose my seed phrase, I will no longer be able to access my wallet.
            </div>
          </div>
        </div>
        <div className="backup-warning__footer">
          <button
            className="extension_cta_button create_cta"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
