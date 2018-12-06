import React, { Component } from 'react';
import StatusBar from '../StatusBar';
import PropTypes from 'prop-types';
import './index.scss';

export default class WizardHeader extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onCancel: PropTypes.func,
    onBack: PropTypes.func
  };

  render() {
    const { currentStep, totalSteps, onCancel, onBack } = this.props;

    return (
      <div className="wizard-header">
        <div className="wizard-header__navigation">
          {this.maybeRender(onBack, () => <i className="arrow left clickable wizard-header__back" onClick={onBack} />)}
          {this.maybeRender(onCancel, () => <span className="wizard-header__cancel" onClick={onCancel}>Cancel</span>)}
        </div>
        <div className="wizard-header__status-bar">
          <StatusBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>
    )
  }

  maybeRender(prop, cb) {
    if (!prop) {
      return null;
    }

    return cb();
  }
}