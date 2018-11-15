import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as extensionActions from '../../../ducks/extension';
import * as walletActions from '../../../ducks/wallet';
import './login.scss';

const { VIEW_TYPES } = extensionActions;

@connect(
  state => ({
    height: state.chain.height,
    currentHash: state.chain.currentHash,
  }),
  dispatch => ({
    unlockWallet: passphrase => {
      dispatch(walletActions.unlockWallet(passphrase))
        .then(() => dispatch(extensionActions.setView(VIEW_TYPES.DEFAULT)));
    },
  }),
)
export default class CreatePassword extends Component {

  static propTypes = {
    unlockWallet: PropTypes.func.isRequired,
    currentHash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  };

  state = {
    passphrase: '',
  };

  render() {
    const { currentHash, height } = this.props;
    const { passphrase } = this.state;

    return (
      <div className="extension_primary_section">
        <div className="header_text"> Log in to your wallet </div>
        <div>
          <input
            className="login_password_input"
            placeholder="Your password"
            onChange={e => this.setState({ passphrase: e.target.value })}
            value={passphrase}
          />
        </div>
        <button
          className="extension_cta_button login_cta"
          onClick={() => this.props.unlockWallet(passphrase)}
        >
          Unlock Wallet
        </button>
        <div className="login_options_wrapper">
          <div className="login_subheader_text">
            Forgot your password?
          </div>
          <div className="login_subheader_text login_subheader_text__accent">
            Restore with your seed phrase
          </div>
        </div>

        <div className="login_background_text_wrapper">
          <div className="account__info-text login_background">
            {`Current Height: #${height}`}
          </div>
          <div className="account__info-text login_background">
            {`Current Hash: ${currentHash.slice(0, 10)}...${currentHash.slice(-10)}`}
          </div>
        </div>

        <div className="extension_primary_line_break login_line_break" />

        <div className="login_resolver_switch">
          <span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
          </span>
          <span className="switch-text login_switch_text">Resolve on Handshake</span>
        </div>
      </div>
    );
  }
}
