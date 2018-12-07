import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Transaction from './Transaction';
import './index.scss';

export default class Transactions extends Component {
  static propTypes = {
    transactionsOrder: PropTypes.array.isRequired
  };

  render() {
    const { transactionsOrder } = this.props;

    return transactionsOrder.map(txId => (
      <div className="transaction__container" key={txId}>
        <Transaction transactionId={txId} />
      </div>
    ));
  }
}
