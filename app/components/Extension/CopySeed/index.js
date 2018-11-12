import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import actions from '../../../actions/extension';
import StatusBar from '../../StatusBar';
import './copy.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class CopySeed extends Component {

  static propTypes = {
    actions: PropTypes.shape({
      setView: PropTypes.func.isRequired,
    }).isRequired,
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    seedphrase: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
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
      seedphrase,
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
          <div className="header_text">Your Recovery Seed Phrase</div>
          <div className="subheader_text copy-seed__subheader">
            This is your secret 24-word phrase to recover your funds. This is the only way to access your funds. Do not lose this phrase.
          </div>
          <div className="copy-seed__textarea" >
            <textarea
              value={seedphrase}
              onClick={e => e.target.select()}
              readOnly
            />
          </div>
        </div>
        <button
          className="extension_cta_button create_cta"
          onClick={onNext}
        >
          I've copied this somewhere safe
        </button>
      </div>
    );
  }
}
