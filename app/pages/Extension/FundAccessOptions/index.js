import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import * as actions from '../../../ducks/extension';
import './access.scss';
import { Link } from 'react-router-dom';

const { VIEW_TYPES } = actions;

@connect(
  state => ({
  }),
  dispatch => ({
  }),
)
export default class FundAccessOptions extends Component {
  renderCheck = () => (
    <div className="circle-check-container">
      <div className="circle-check-symbol" />
    </div>
  );

  render() {
    const { setView } = this.props;

    return (
      <div className="extension_primary_section">
        <div
          className="subheader_text clickable"
          onClick={() => this.props.setView(VIEW_TYPES.DEFAULT)}
        >
          <span className="directional_symbol access_back">
            <i className="arrow left" />
          </span>
          <span>
            Back
          </span>
        </div>
        <div className="extension_primary_line_break access_line_break" />
        <div className="header_text"> How would you like to access your wallet? </div>
        <div className="access_cta_wrapper">
          <button className="access_cta_button">
            { this.renderCheck() }
            <div className="access_cta_primary_text">
              <span>Connect Ledger Device</span>
            </div>
            <div className="access_cta_secondary_text"> Recommended </div>
          </button>

          <Link className="access_cta_button" to="/import-seed">
            { this.renderCheck() }
            <div className="access_cta_primary_text">
              <span>Import Seed Phrase</span>
            </div>
            <div className="access_cta_secondary_text"> Not Secure </div>
          </Link>

          <Link className="access_cta_button" to="/new-wallet">
            { this.renderCheck() }
            <div className="access_cta_primary_text">
              <span> Create A New Wallet </span>
            </div>
            <div className="access_cta_secondary_text"> Not Secure </div>
          </Link>
        </div>
      </div>
    );
  }
}
