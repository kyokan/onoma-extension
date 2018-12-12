import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConnectLedgerStep from './ConnectLedgerStep';
import './connect.scss';

// wizard header

@withRouter
export default class ConnectLedger extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    isLedgerConnected: false,
    secretEntered: false,
    handshakeSelected: true,
  };

  allStepsComplete() {
    const { isLedgerConnected, secretEntered, handshakeSelected } = this.state;
    return isLedgerConnected && secretEntered && handshakeSelected;
  }

  finishFlow() {
    if (this.allStepsComplete()) {
      return console.log('DONEEEEZO');
    }
    return console.log('Not donezo :(');
  }

  render() {
    const { isLedgerConnected, secretEntered, handshakeSelected } = this.state;

    const ctaClasses = classNames([
      'connect_cta',
      this.allStepsComplete() ? 'connect_cta__active' : false,
    ]);
    // Btn primary
    return (
      <div className="extension_primary_section">
        <div
          className="subheader_text clickable"
          onClick={() => {
            this.props.history.push('/existing-options');
          }}
        >
          <span className="directional_symbol connect_back">
            <i className="arrow left" />
          </span>
          <span>Back</span>
        </div>
        <div className="extension_primary_line_break connect_line_break" />
        <div className="header_text connect_header"> Connect your Ledger </div>

        <ConnectLedgerStep
          stepNumber={1}
          stepDescription={
            'Connect your Ledger wallet directly to your computer'
          }
          stepCompleted={isLedgerConnected}
        />
        <ConnectLedgerStep
          stepNumber={2}
          stepDescription={'Enter your secret pin on your Ledger device'}
          stepCompleted={secretEntered}
        />
        <ConnectLedgerStep
          stepNumber={3}
          stepDescription={'Select the Handshake app on your Ledger device'}
          stepCompleted={handshakeSelected}
        />

        <button
          className={ctaClasses}
          onClick={() => {
            this.finishFlow();
          }}
        >
          Unlock Ledger
        </button>

        <div className="connect_support_cta">Need help? Visit support page</div>
      </div>
    );
  }
}
