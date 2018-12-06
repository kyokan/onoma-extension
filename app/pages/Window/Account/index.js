import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BigNumber as bn } from 'bignumber.js';
import classnames from 'classnames';

import Modal from '../../../components/Modal/index';
import './account.scss';

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

    // conditional styling
    const iconStyling = tx =>
      classnames('account__list-item__tx-icon ', {
        'account__list-item__tx-icon--pending': tx.pending,
        'account__list-item__tx-icon--received': tx.type === 'received' && !tx.pending,
        'account__list-item__tx-icon--sent': tx.type === 'sent' && !tx.pending
      });

    const titleStyling = tx =>
      classnames('account__list-item__title', {
        'account__list-item__title--pending': tx.pending
      });

    const numberStyling = tx =>
      classnames('account__list-item__number', {
        'account__list-item__number--pending': tx.pending,
        'account__list-item__number--positive': tx.type === 'received' && !tx.pending,
        'account__list-item__number--negative': tx.type === 'sent' && !tx.pending
      });

    // conditional rendering

    const renderIcon = tx => <div className={iconStyling(tx)} />;

    const renderTimestamp = tx => {
      const date = new Date(tx.date * 1000);
      const year = date
        .getFullYear()
        .toString()
        .slice(2);
      const month = date.getMonth();
      const day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      const strTime = `${hours}:${minutes} ${ampm}`;

      return (
        <div className="account__list-item__tx-timestamp">
          <div className={titleStyling(tx)}>
            {day}/{month}/{year}
          </div>
          <div className="account__list-item__subtitle">{strTime}</div>
        </div>
      );
    };

    const renderDescription = tx => {
      let description = '';
      if (tx.pending) {
        description = 'Pending transaction';
      } else if (tx.type === 'sent') {
        description = 'Sent funds';
      } else if (tx.type === 'received') {
        description = 'Reiceived funds';
      } else {
        description = 'undefined tx type';
      }

      return (
        <div className="account__list-item__tx-description">
          <div className={titleStyling(tx)}>{description}</div>
          <div className="account__list-item__subtitle">
            from {tx.type === 'received' ? tx.sender : tx.receiver}
          </div>
        </div>
      );
    };

    const renderNumber = tx => (
      <div className="account__list-item__tx-value">
        <div className={numberStyling(tx)}>
          {tx.type === 'received' ? '+' : '-'}
          {tx.value} HNS
        </div>
        <div className="account__list-item__subtitle">{tx.balance} HNS</div>
      </div>
    );

    return !transactionsDummyArray.length
      ? this.renderEmpty('You do not have any transactions')
      : transactionsDummyArray.map(tx => (
        <div className="account__list-item__container" id={tx.id}>
          <div className="account__list-item">
            {renderIcon(tx)}
            {renderTimestamp(tx)}
            {renderDescription(tx)}
            {renderNumber(tx)}
          </div>
        </div>
        ));
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
            <div className="account__balance-wrapper__amount">
              {`HNS ${+balance.toFixed(5)}`}
            </div>
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
