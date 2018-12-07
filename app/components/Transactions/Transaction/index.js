import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BigNumber as bn } from 'bignumber.js';

import createAMPMTimeStamp from '../../../utils/timeConverter';

import '../index.scss';

const RECEIVED = 'received';
const SENT = 'sent';

export default class Transaction extends Component {
  static propTypes = {
    transactionId: PropTypes.number.isRequired
  };

  transactionsDummyMap = {
    1: {
      id: 1,
      type: 'sent',
      date: 1542033412,
      pending: true,
      receiver: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
      value: 5.0,
      balance: 7499.00075
    },
    2: {
      id: 2,
      type: 'received',
      date: 1542032412,
      pending: false,
      sender: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
      value: 7500,
      balance: 7501.00075
    },
    3: {
      id: 3,
      type: 'received',
      date: 1542013054,
      pending: false,
      sender: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
      value: 1,
      balance: 1.00075
    },
    4: {
      id: 4,
      type: 'sent',
      date: 1542012054,
      pending: false,
      receiver: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
      value: 0.00025,
      balance: 0.00075
    },
    5: {
      id: 5,
      type: 'received',
      date: 1542011054,
      pending: false,
      sender: '1G83fdm3HUXrCNLbtMDqcw6o5GNn4xqX',
      value: 1.0,
      balance: 1.0
    }
  };

  // conditional styling
  iconStyling = tx =>
    classnames('transaction__tx-icon ', {
      'transaction__tx-icon--pending': tx.pending,
      'transaction__tx-icon--received': tx.type === RECEIVED && !tx.pending,
      'transaction__tx-icon--sent': tx.type === SENT && !tx.pending
    });

  titleStyling = tx =>
    classnames('transaction__title', {
      'transaction__title--pending': tx.pending
    });

  numberStyling = tx =>
    classnames('transaction__number', {
      'transaction__number--pending': tx.pending,
      'transaction__number--positive': tx.type === RECEIVED && !tx.pending,
      'transaction__number--negative': tx.type === SENT && !tx.pending
    });

  // conditional rendering
  renderIcon = tx => <div className={this.iconStyling(tx)} />;

  renderTimestamp = tx => {
    const { year, month, day, strTime } = createAMPMTimeStamp(tx.date);

    return (
      <div className="transaction__tx-timestamp">
        <div className={this.titleStyling(tx)}>
          {day}/{month}/{year}
        </div>
        <div className="transaction__subtitle">{strTime}</div>
      </div>
    );
  };

  renderDescription = tx => {
    let description = '';
    if (tx.pending) {
      description = 'Pending transaction';
    } else if (tx.type === SENT) {
      description = 'Sent funds';
    } else if (tx.type === RECEIVED) {
      description = 'Received funds';
    } else {
      description = 'undefined tx type';
    }

    return (
      <div className="transaction__tx-description">
        <div className={this.titleStyling(tx)}>{description}</div>
        <div className="transaction__subtitle">
          {tx.type === RECEIVED ? `from ${tx.sender}` : `to ${tx.receiver}`}
        </div>
      </div>
    );
  };

  renderNumber = tx => (
    <div className="transaction__tx-value">
      <div className={this.numberStyling(tx)}>
        {tx.type === RECEIVED ? '+' : '-'}
        {tx.value % 1 === 0 ? bn(tx.value).toFixed(1) : tx.value} HNS
      </div>
      <div className="transaction__subtitle">
        {tx.balance % 1 === 0 ? bn(tx.balance).toFixed(1) : tx.balance} HNS
      </div>
    </div>
  );

  render() {
    const { transactionId } = this.props;
    const transaction = this.transactionsDummyMap[transactionId];

    return (
      <div className="transaction">
        {this.renderIcon(transaction)}
        {this.renderTimestamp(transaction)}
        {this.renderDescription(transaction)}
        {this.renderNumber(transaction)}
      </div>
    );
  }
}

//TODO: Connect component to Redux and grab transactionsMap directly
