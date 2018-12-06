import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import * as actions from '../../../ducks/extension';
import './access.scss';
import { Link, withRouter } from 'react-router-dom';

const { VIEW_TYPES } = actions;

// @connect(
//   state => ({
//   }),
//   dispatch => ({
//   }),
// )
@withRouter
export default class FundAccessOptions extends Component {

  render() {
    return (
      <div className="extension_primary_section funding-options">
        <div className="funding-options__header">
          <div className="funding-options__header__alice" />
          <div className="funding-options__header__the-cat" />
        </div>
        <div className="funding-options__content">
          <div className="funding-options__content__title">
            Allison Animates the Web
          </div>
          <div className="funding-options__content__body-text">
            Take control of your Handshake coins. browse Handshake websites, and auction domains.
          </div>
        </div>
        <div className="funding-options__footer">
          <button
            className="funding-options__footer__primary-btn"
            onClick={() => this.props.history.push('/new-wallet')}
          >
            Create a new wallet
          </button>
          <button
            className="funding-options__footer__secondary-btn"
            onClick={() => this.props.history.push('/import-seed')}
          >
            I already have a wallet
          </button>
        </div>
      </div>
    );
  }
}
