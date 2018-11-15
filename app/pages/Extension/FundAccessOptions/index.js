import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import * as actions from '../../../ducks/extension';
import './access.scss';

const { VIEW_TYPES } = actions;

@connect(
  state => ({
  }),
  dispatch => ({
    setView: viewType => dispatch(actions.setView(viewType)),
  }),
)
export default class FundAccessOptions extends Component {

  static propTypes = {
    setView: PropTypes.func.isRequired,
  };

  state = {
    activeButton: 'none',
  };

  handleClick = (optionName) => {
    const { activeButton } = this.state;
    const { setView } = this.props;
    if (activeButton === optionName) {
      switch (optionName) {
        case 'create':
          return setView(VIEW_TYPES.CREATE_NEW_ACCOUNT);
        case 'ledger':
        case 'seed':
        default:
          return null;
      }
    }

    this.setState({ activeButton: optionName });
  };

  renderCheck = () => (
    <div className="circle-check-container">
      <div className="circle-check-symbol" />
    </div>
    );

  render() {
    let ledgerCheck = null;
    let seedCheck = null;
    let createCheck = null;

    switch (this.state.activeButton) {
      case 'ledger':
        ledgerCheck = this.renderCheck();
        break;
      case 'seed':
        seedCheck = this.renderCheck();
        break;
      case 'create':
        createCheck = this.renderCheck();
        break;
      default:
        break;
    }

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
          <button className="access_cta_button" onClick={this.handleClick.bind(this, 'ledger')}>
            {ledgerCheck}
            <div className="access_cta_primary_text">
              <span>Connect Ledger Device</span>
            </div>
            <div className="access_cta_secondary_text"> Recommended </div>
          </button>

          <button className="access_cta_button" onClick={this.handleClick.bind(this, 'seed')}>
            {seedCheck}
            <div className="access_cta_primary_text">
              <span>Import Seed Phrase</span>
            </div>
            <div className="access_cta_secondary_text"> Not Secure </div>
          </button>

          <button className="access_cta_button" onClick={this.handleClick.bind(this, 'create')}>
            {createCheck}
            <div className="access_cta_primary_text">
              <span> Create A New Wallet </span>
            </div>
            <div className="access_cta_secondary_text"> Not Secure </div>
          </button>
        </div>
      </div>
    );
  }
}
