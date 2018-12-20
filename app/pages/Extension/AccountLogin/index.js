import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as extensionActions from '../../../ducks/extension';
import * as walletActions from '../../../ducks/wallet';
import './login.scss';
import ExtensionWrapper from '../ExtensionWrapper';
import Submittable from '../../../components/Submittable';
import Hash from '../../../components/Hash';

@connect(
  state => ({
    height: state.chain.height,
    currentHash: state.chain.currentHash,
  }),
  dispatch => ({
    unlockWallet: passphrase => dispatch(walletActions.unlockWallet(passphrase)),
    toggleResolve: () => dispatch(extensionActions.toggleResolve()),
  }),
)
export default class AccountLogin extends Component {

  static propTypes = {
    unlockWallet: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    currentHash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    passphrase: '',
  };

  render() {
    const {currentHash, height, className} = this.props;
    const {passphrase} = this.state;

    return (
      <ExtensionWrapper className={className}>
        <div className="header_text"> Log in to your wallet</div>
        <Submittable onSubmit={() => this.props.unlockWallet(passphrase)}>
          <div>
            <input
              className="login_password_input"
              type="password"
              placeholder="Your password"
              onChange={e => this.setState({passphrase: e.target.value})}
              value={passphrase}
              autoFocus
            />
          </div>
        </Submittable>
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
            Current Hash: <Hash value={currentHash} />
          </div>
        </div>

        <div className="extension_primary_line_break login_line_break" />

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
        </div>
      </ExtensionWrapper>
    );
  }
}
