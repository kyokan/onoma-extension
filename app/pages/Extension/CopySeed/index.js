/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './copy.scss';
import WizardHeader from '../../../components/WizardHeader';

@connect()
export default class CopySeed extends Component {

  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    seedphrase: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    seedphrase: 'witch collapse practice feed shame open despair creek road again ice least',
  };

  render() {
    const {
      currentStep,
      totalSteps,
      onBack,
      onNext,
      onCancel,
      seedphrase,
    } = this.props;

    return (
      <div className="create-password">
        <WizardHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} onCancel={onCancel} />
        <div className="create-password__content">
          <div className="header_text">Your Recovery Seed Phrase</div>
          <div className="subheader_text copy-seed__subheader">
            This is your secret 24-word phrase to recover your funds. This is the only way to access your funds. Do not
            lose this phrase.
          </div>
          <div className="copy-seed__textarea">
            <textarea
              value={seedphrase}
              onClick={e => e.target.select()}
              readOnly
            />
          </div>
        </div>
        <div className="create-password__footer">
          <button
            className="extension_cta_button create_cta"
            onClick={onNext}
          >
            I've copied this somewhere safe
          </button>
        </div>
      </div>
    );
  }
}
