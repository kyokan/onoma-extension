import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import './existing.scss';

@withRouter
export default class ExistingAccountOptions extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  };

  render() {
    return (
      <div className="existing-options">
        <div className="existing-options__header">
          <i
            className="arrow left"
            onClick={() => this.props.history.push('/funding-options')}
          />
        </div>
        <div className="existing-options__content">
          <div className="existing-options__content__title">
            How would you like to access your Handshake wallet?
          </div>
          <div
            className="existing-options__content__option"
            // TODO: Michael to add new route and create onboarding component.
            // Refer to CreateNewAccount; you have to create a <ConnectLedger />
            // onClick={() => this.props.history.push('/connect-ledger')}
          >
            <div>Connect Ledger Device</div>
            <div>COMING SOON</div>
          </div>
          <div className="existing-options__content__option">
            <div>Import Your Seed Phrase</div>
            <div>NOT SECURE</div>
          </div>
        </div>
        <div className="existing-options__footer">
          <div></div>
        </div>
      </div>
    );
  }
}
