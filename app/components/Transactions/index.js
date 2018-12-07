import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Transaction from './Transaction';
import './index.scss';

// Dummy transactions state until we have ducks
import { transactionsDummyOrder } from '../../utils/mockingTransactionsState';

export default class Transactions extends Component {
  static propTypes = {
    transactionsOrder: PropTypes.array.isRequired
  };

  render() {
    return transactionsDummyOrder.map(txId => (
      <div className="transaction__container" key={txId}>
        <Transaction transactionId={txId} />
      </div>
    ));
  }
}

//TODO: Connect component to Redux and grab transactionsOrder directly
