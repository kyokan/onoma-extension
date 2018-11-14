/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import c from 'classnames';
import StatusBar from '../../../components/StatusBar/index';
import './confirm-seed.scss';

@connect()
export default class ConfirmSeed extends Component {

  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    seedphrase: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  static defaultProps = {
    seedphrase: 'witch collapse practice feed shame open despair creek road again ice least',
  };

  state = {
    words: '',
    pasteAttempted: false,
  };

  handleKeyDown = e => {
    if (e.key === 'Enter' || !(/^[a-zA-Z ]+$/).test(e.key)) {
      e.preventDefault();
    }
  };

  render() {
    const {
      currentStep,
      totalSteps,
      onBack,
      onNext,
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
          <div className="header_text">Verify Your Seed Phrase</div>
          <div className="subheader_text copy-seed__subheader">
            This is your secret 24-word phrase to recover your funds. This is the only way to access your funds. Do not lose this phrase.
          </div>
          <div
            className={c('copy-seed__textarea', {
              'copy-seed__textarea--shake': this.state.pasteAttempted,
            })}
          >
            <textarea
              placeholder="Type your seedphrase here"
              onKeyDown={this.handleKeyDown}
              onChange={e => this.setState({ words: e.target.value })}
              onPaste={e => {
                e.preventDefault();
                this.setState({ pasteAttempted: true });
                setTimeout(() => this.setState({ pasteAttempted: false }), 1000);
              }}
              value={this.state.words}
            />
          </div>
        </div>
        <button
          className="extension_cta_button create_cta"
          onClick={() => {
            if (this.state.words === this.props.seedphrase) {
              onNext();
            } else {
              alert('Seed Phrase does not match');
            }
          }}
        >
          Next
        </button>
      </div>
    );
  }
}
