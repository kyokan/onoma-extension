import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../ducks/extension';
import AccountDropdown from '../../../components/AccountDropdown';
import '../extension.scss';
import './loggedin.scss';

@connect(
  null,
  dispatch => ({
    ...bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    isSynchronized: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isSynchronized: false,
  };

  state = {
    currentIndex: 0,
  };

  render() {
    const { isSynchronized } = this.props;

    return (
      <div className="account">
        <div className="header_text account_header">
          <div className="account__title">handshake wallet</div>
          <button
            className="account__logout-btn"
            onClick={() => console.log('logging out')}
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
          <div className="extension_option_text account_option">
            Send
          </div>
          <div className="extension_option_text account_option">
            Receive
          </div>
          <div className="extension_option_text account_option">
            Submit Proof
          </div>
          <div className="extension_option_text account_option">
            Browse Domains
          </div>
          <div className="extension_option_text account_option">
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
              Current Height: #3952
            </div>
            <div className="account__info-text">
              Current Hash: 0fj48fj30fuw0fj48fj30fuw0fj4
            </div>
          </div>
        </div>
      </div>
    );
  }
}
