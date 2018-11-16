import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as extensionDuck from '../../../ducks/extension';
import '../extension.scss';
import './default.scss';
import extension from 'extensionizer';

const { VIEW_TYPES } = extensionDuck;

@connect(
  state => ({
    height: state.chain.height,
    currentHash: state.chain.currentHash,
  }),
  dispatch => ({
    setView: viewType => dispatch(extensionDuck.setView(viewType)),
  }),
)
export default class App extends Component {

  static propTypes = {
    setView: PropTypes.func.isRequired,
    currentHash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  };

  render() {
    const { setView, height, currentHash } = this.props;

    return (
      <div className="default">
        <div className="default__primary-section">
          <div className="header_text default_header">
            handshake wallet
          </div>
          <div className="subheader_text default_subheader">
            Take control of your Handshake coins and domain names.
          </div>
          <button
            className="extension_cta_button cta__btn default_cta"
            onClick={() => setView(VIEW_TYPES.CREATE_ACCOUNT_OPTIONS)}
          >
            Get Started
          </button>
          <div className="extension_primary_line_break default_line_break" />
        </div>
        <div className="default__primary-section">
          <div
            className="extension_option_text default_option"
            onClick={() => {
              const url = extension.runtime.getURL('window.html');
              extension.tabs.create({ url });
            }}
          >
            Browse Domains
          </div>
          <div className="extension_option_text default_option">
            Information
          </div>
          <div className="extension_option_text default_option">
            Help
          </div>
          <div className="resolver_switch">
            <span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
            </span>
            <span className="switch-text">Resolve on Handshake</span>
          </div>
          <div className="default_background_text_wrapper">
            <div className="account__info-text">
              {`Current Height: #${height}`}
            </div>
            <div className="account__info-text">
              {`Current Hash: ${currentHash.slice(0, 10)}...${currentHash.slice(-10)}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
