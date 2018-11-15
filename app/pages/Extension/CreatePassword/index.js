import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StatusBar from '../../../components/StatusBar/index';
import './create.scss';

@connect()
export default class CreatePassword extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onConfirmPasswordChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      currentStep,
      totalSteps,
      onBack,
      onNext,
      onPasswordChange,
      onConfirmPasswordChange,
    } = this.props;

    return (
      <div className="extension_primary_section create-password">
        <div
          className="subheader_text clickable"
          onClick={onBack}
        >
          <span className="directional_symbol create_back">
            <i className="arrow left" />
          </span>
          <span>Back</span>
        </div>
        <div className="create-password__content">
          <div className="create_status_bar">
            <StatusBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          <div className="header_text">Encrypt your wallet with a password.</div>
          <div className="create-password__input">
            <input
              type="password"
              placeholder="Enter Password"
              onChange={e => onPasswordChange(e.target.value)}
            />
          </div>
          <div className="create-password__input">
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={e => onConfirmPasswordChange(e.target.value)}
            />
          </div>
        </div>
        <button
          className="extension_cta_button create_cta"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    );
  }
}
