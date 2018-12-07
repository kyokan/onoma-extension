import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BigNumber as bn } from 'bignumber.js';
import classnames from 'classnames';

import Modal from '../../../components/Modal/index';
import './account.scss';
import createAMPMTimeStamp from '../../../utils/timeConverter';
import Transactions from '../../../components/Transactions';

class Account extends Component {
  static propTypes = {
    accountBase: PropTypes.string.isRequired,
    accountIndex: PropTypes.number.isRequired,
    balance: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    domains: PropTypes.array.isRequired
  };

  static defaultProps = {
    accountBase: 'm/44`/5353`/',
    accountIndex: 0,
    balance: bn(0),
    transactions: [],
    domains: []
  };

  state = {
    isShowingAccountModal: false
  };

  openModal = () => this.setState({ isShowingAccountModal: true });
  closeModal = () => this.setState({ isShowingAccountModal: false });

  renderEmpty = text => <div className="account__empty-list">{text}</div>;

  renderTransactions() {
    const { transactions } = this.props;
    const transactionsDummyArray = [
      {
        id: 1,
        type: 'sent',
        date: 1542033412,
        pending: true,
        receiver: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
        value: 5.0,
        balance: 7499.00075
      },
      {
        id: 2,
        type: 'received',
        date: 1542032412,
        pending: false,
        sender: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
        value: 7500,
        balance: 7501.00075
      },
      {
        id: 3,
        type: 'received',
        date: 1542013054,
        pending: false,
        sender: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
        value: 1,
        balance: 1.00075
      },
      {
        id: 4,
        type: 'sent',
        date: 1542012054,
        pending: false,
        receiver: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
        value: 0.00025,
        balance: 0.00075
      },
      {
        id: 5,
        type: 'received',
        date: 1542011054,
        pending: false,
        sender: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
        value: 1.0,
        balance: 1.0
      }
    ];

    return !transactionsDummyArray.length ? (
      this.renderEmpty('You do not have any transactions')
    ) : (
      <Transactions transactions={transactionsDummyArray} />
    );
  }

  renderDomains() {
    const { domains } = this.props;

    return !domains.length
      ? this.renderEmpty('You have no domains.js')
      : domains.map(tx => <div>I am a domain</div>);
  }

  renderAccountModal() {
    const { accountBase, accountIndex } = this.props;

    return !this.state.isShowingAccountModal ? null : (
      <Modal className="account__switch-account-modal" onClose={this.closeModal}>
        <div className="account__switch-account-modal__wrapper">
          <div className="account__switch-account-modal__close-btn" onClick={this.closeModal}>
            ✕
          </div>
          <div className="account__switch-account-modal__header">
            <div className="account__switch-account-modal__title">Switch Account</div>
            <div className="account__switch-account-modal__subtitle">
              Enter an account index you would like to interact with
            </div>
          </div>
          <div className="account__switch-account-modal__content">
            <div className="account__switch-account-modal__account-base">{`${accountBase}`}</div>
            <input
              type="number"
              className="account__switch-account-modal__account-index"
              placeholder={accountIndex}
              min="0"
            />
          </div>
          <div className="account__switch-account-modal__footer">
            <button className="account__switch-account-modal__btn">Switch</button>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    const { balance } = this.props;

    return (
      <div className="account">
        <div className="account__address">
          <div>Default Account</div>
          <div className="account__info-icon" />
        </div>
        <div className="account__header">
          <div className="account__balance-wrapper">
            <div className="account__balance-wrapper__amount">{`HNS ${+balance.toFixed(5)}`}</div>
          </div>
        </div>
        <div className="account__content">
          <div className="account__transactions">
            <div className="account__panel-title">Your Recent Transactions</div>
            {this.renderTransactions()}
          </div>
          <div className="account__domains">
            <div className="account__panel-title">Your Domains</div>
            {this.renderDomains()}
          </div>
        </div>
        {this.renderAccountModal()}
      </div>
    );
  }
}

export default connect(state => ({
  balance: bn(state.wallet.balance.confirmed)
}))(Account);
