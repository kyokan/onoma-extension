import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import extension from 'extensionizer';
import * as extensionDuck from '../../../ducks/extension';
import '../extension.scss';
import './default.scss';
import { withRouter } from 'react-router-dom';

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
@withRouter
export default class App extends Component {
  static propTypes = {
    setView: PropTypes.func.isRequired,
    toggleResolve: PropTypes.func.isRequired,
    currentHash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className="default">
        <div className="default__header">
          <div className="default__block-height">
            <span>Current Height:</span>
            <span className="default__blue">{height}</span>
          </div>
          <div className="default__block-hash">
            <span>Current Hash:</span>
            <span className="default__blue">
              {currentHash.slice(0, 4)}...{currentHash.slice(-5)}
            </span>
          </div>
        </div>
        <div className="default__content">
          <div className="default__content__title">Allison Animates the Web</div>
          <button
            className="extension_cta_button cta__btn default_cta"
            onClick={() => this.props.history.push('/funding-options')}
          >
            Set up my Handshake wallet
          </button>
          <div
            className="default__content__link"
            onClick={() => {
              const url = extension.runtime.getURL('window.html');
              extension.tabs.create({ url });
            }}
          >
            Browse Domains
          </div>
          <div className="default__content__link">
            FAQ
          </div>
        </div>
        <div className="default__footer">
          <div className="login_resolver_switch">
            <span>
              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked={!!localStorage.getItem('shouldResolveOnHandshake')}
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
            <span className="default__info-icon" />
          </span>
        </div>
      </div>
    );
  }
}
