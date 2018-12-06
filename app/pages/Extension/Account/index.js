import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import extension from 'extensionizer';
import * as walletActions from '../../../ducks/wallet';
import AccountDropdown from '../../../components/Dropdown';
import '../extension.scss';
import './loggedin.scss';
import Hash from '../../../components/Hash';


@connect(
  state => ({
    height: state.chain.height,
    currentHash: state.chain.currentHash,
    isSynchronized: state.chain.synced,
  }),
  dispatch => ({
    lockWallet: () => dispatch(walletActions.lockWallet()),
  }),
)
export default class App extends Component {
  static propTypes = {
    isSynchronized: PropTypes.bool.isRequired,
    lockWallet: PropTypes.func.isRequired,
    currentHash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    isSynchronized: false,
  };

  state = {
    currentIndex: 0,
  };

  goto = (path = '') => {
    const url = extension.runtime.getURL('window.html');
    extension.tabs.create({
      url: `${url}#${path}`,
    });
  };

  render() {
    const { isSynchronized, lockWallet, height, currentHash } = this.props;

    const accOptionClassName = 'extension_option_text account_option';

    return (
      <div className="account">
        <div className="header_text account_header">
          <div className="account__title">handshake wallet</div>
          <button
            className="account__logout-btn"
            onClick={lockWallet}
          >
            Logout
          </button>
        </div>
        <div className="account__header-content">
          <AccountDropdown
            items={[
              { label: 'Default Account' },
              { label: 'Connect to Ledger' },
            ]}
            currentIndex={this.state.currentIndex}
            onChange={i => this.setState({ currentIndex: i })}
          />
        </div>
        <div className="account__options">
          <div className={accOptionClassName} onClick={() => this.goto('/send')}>
            Send
          </div>
          <div className={accOptionClassName} onClick={() => this.goto('/receive')}>
            Receive
          </div>
          <div className={accOptionClassName} onClick={() => this.goto('/get_coins')}>
            Submit Proof
          </div>
          <div className="extension_option_text account_option">
            Browse Domains
          </div>
          <div className={accOptionClassName} onClick={() => this.goto('/settings')}>
            Settings
          </div>
          <div className="extension_option_text account_option">
            Help
          </div>
        </div>
        <div className="account__footer">
          <div className="account__status">
            {
              isSynchronized
                ? (
                  <div className="account__status-text account__status-text--sync">
                    Synchronized
                  </div>
                )
                : (
                  <div className="account__status-text account__status-text--not-sync">
                    <span>Not Synchronized</span>
                    <span>Refresh</span>
                  </div>
                )
            }
          </div>
          <div className="account_background_text_wrapper">
            <div className="account__info-text">
              {`Current Height: #${height}`}
            </div>
            <div className="account__info-text">
              Current Hash: <Hash value={currentHash} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
