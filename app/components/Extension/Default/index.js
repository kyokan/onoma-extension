import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import '../extension.scss';
import './default.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    actions: PropTypes.shape({
      setView: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { actions: { setView } } = this.props;
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
            onClick={() => setView('create-account-options')}
          >
            Get Started
          </button>
          <div className="extension_primary_line_break default_line_break" />
        </div>
        <div className="default__primary-section">
          <div className="extension_option_text default_option" onClick={actions.openExtensionInBrowser}> Browse Domains </div>
          <div className="extension_option_text default_option"> Information </div>
          <div className="extension_option_text default_option"> Help </div>
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
            <div className="extension_background_text default_background">Version 1.0</div>
            <div className="extension_background_text default_background">Current Height: #3952</div>
            <div className="extension_background_text default_background">Current Hash: 0fj48fj30fuw-0fj48fj30fuw-0fj48fj30fuw</div>
          </div>
        </div>
      </div>
    );
  }
}
