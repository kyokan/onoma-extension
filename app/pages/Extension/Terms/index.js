import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../ducks/extension';
import StatusBar from '../../../components/StatusBar/index';
import './terms.scss';

@connect(
  null,
  dispatch => ({
    setView: viewType => dispatch(actions.setView(viewType)),
  })
)
export default class CreatePassword extends Component {

  static propTypes = {
    setView: PropTypes.func.isRequired,
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onAccept: PropTypes.func.isRequired,
  };

  render() {
    const {
      setView,
      currentStep,
      totalSteps,
      onAccept,
    } = this.props;

    return (
      <div className="extension_primary_section">
        <div
          className="subheader_text clickable"
          onClick={() => setView('default')}
        >
          <span className="directional_symbol terms_back">
            <i className="arrow left" />
          </span>
          <span>Back</span>
        </div>
        <div className="terms__status-bar">
          <StatusBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className="header_text">
          Terms of Use
        </div>
        <div className="subheader_text terms_subheader">
          {'Please review and agree to the Handshake wallet\'s terms of use.'}
        </div>
        <button className="terms_button clickable">
          <span>Terms of Use</span>
          <span className="directional_symbol terms_forward_arrow">
            <i className="right" />
          </span>
        </button>
        <button
          className="extension_cta_button terms_cta"
          onClick={onAccept}
        >
          Accept
        </button>
      </div>
    );
  }
}
