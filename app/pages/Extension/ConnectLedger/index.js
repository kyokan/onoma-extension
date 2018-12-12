import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import WizardHeader from '../../../components/WizardHeader';
import ConnectLedgerStep from './ConnectLedgerStep';
import './connect.scss';

// wizard header

@withRouter
export default class ConnectLedger extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
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

    const { onBack, onCancel } = this.props;
    // Btn primary
    return (
      <div className="create-password">
        <div className="terms__header">
          <i
            className="arrow left clickable wizard-header__back"
            onClick={onBack}
          />
          <span className="wizard-header__cancel" onClick={onCancel}>
            Cancel
          </span>
        </div>
        <div className="create-password__content">
          <div className="import-header-text">Import your recovery phrase</div>
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
        </div>
        <div className="create-password__footer">
          <button
            className="import_cta_button"
            onClick={() => console.log('hi')}
            disabled
          >
            Unlock funds
          </button>
          <div className="connect_support_cta">
            Need help? Visit support page
          </div>
        </div>

        {/* <button
          className={ctaClasses}
          onClick={() => {
            this.finishFlow();
          }}
        >
          Unlock Ledger
        </button> */}
      </div>
    );
  }
}
