import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BigNumber as bn } from 'bignumber.js';

import createAMPMTimeStamp from '../../utils/timeConverter';

import './index.scss';

export default class Transactions extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired
  };

  // conditional styling
  iconStyling = tx =>
    classnames('transaction__tx-icon ', {
      'transaction__tx-icon--pending': tx.pending,
      'transaction__tx-icon--received': tx.type === 'received' && !tx.pending,
      'transaction__tx-icon--sent': tx.type === 'sent' && !tx.pending
    });

  titleStyling = tx =>
    classnames('transaction__title', {
      'transaction__title--pending': tx.pending
    });

  numberStyling = tx =>
    classnames('transaction__number', {
      'transaction__number--pending': tx.pending,
      'transaction__number--positive': tx.type === 'received' && !tx.pending,
      'transaction__number--negative': tx.type === 'sent' && !tx.pending
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
    } else if (tx.type === 'sent') {
      description = 'Sent funds';
    } else if (tx.type === 'received') {
      description = 'Reiceived funds';
    } else {
      description = 'undefined tx type';
    }

    return (
      <div className="transaction__tx-description">
        <div className={this.titleStyling(tx)}>{description}</div>
        <div className="transaction__subtitle">
          from {tx.type === 'received' ? tx.sender : tx.receiver}
        </div>
      </div>
    );
  };

  renderNumber = tx => (
    <div className="transaction__tx-value">
      <div className={this.numberStyling(tx)}>
        {tx.type === 'received' ? '+' : '-'}
        {tx.value} HNS
      </div>
      <div className="transaction__subtitle">{tx.balance} HNS</div>
    </div>
  );

  render() {
    const { transactions } = this.props;

    return transactions.map(tx => (
      <div className="transaction__container" id={tx.id}>
        <div className="transaction">
          {this.renderIcon(tx)}
          {this.renderTimestamp(tx)}
          {this.renderDescription(tx)}
          {this.renderNumber(tx)}
        </div>
      </div>
    ));
  }
}
