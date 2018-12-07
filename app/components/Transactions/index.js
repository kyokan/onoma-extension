import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Transaction from './Transaction';
import './index.scss';

export default class Transactions extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired
  };

  render() {
    const { transactions } = this.props;

    return transactions.map(tx => (
      <div className="transaction__container" id={tx.id}>
        <Transaction transaction={tx} />
      </div>
    ));
  }
}
