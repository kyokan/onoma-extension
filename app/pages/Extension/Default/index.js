import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import extension from 'extensionizer';
import * as extensionDuck from '../../../ducks/extension';
import '../extension.scss';
import './default.scss';

const { VIEW_TYPES } = extensionDuck;

@connect(
  state => ({
    height: state.chain.height,
    currentHash: state.chain.currentHash,
  }),
  dispatch => ({
    setView: viewType => dispatch(extensionDuck.setView(viewType)),
    toggleResolve: () => dispatch(extensionDuck.toggleResolve()),
  }),
)
export default class App extends Component {

  static propTypes = {
    setView: PropTypes.func.isRequired,
    toggleResolve: PropTypes.func.isRequired,
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
        <div className="default__primary-section default__content">
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
        </div>
        <div className="default__footer">
          <div className="login_resolver_switch">
            <span>
              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked={!!localStorage.getItem('shouldResovleOnHandshake')}
                  onChange={() => {
                    this.props.toggleResolve();
                  }}
                />
                <span className="slider round" />
              </label>
            </span>
            <span className="switch-text login_switch_text">
              Resolve on Handshake
            </span>
          </div>
        </div>
      </div>
    );
  }
}
