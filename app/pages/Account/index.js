import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BigNumber as bn } from 'bignumber.js';
import './account.scss';

class Account extends Component {
  static propTypes = {
    account: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    domains: PropTypes.array.isRequired,
  };

  static defaultProps = {
    account: 'm/44`/5353`/0',
    balance: bn(0),
    transactions: [],
    domains: [],
  };

  renderEmpty = text => <div>{text}</div>

  renderTransactions() {
    const { transactions } = this.props;

    return !transactions.length
      ? this.renderEmpty('You do not have any transactions')
      : transactions.map(tx => <div>I am a transaction</div>);
  }

  renderDomains() {
    const { domains } = this.props;

    return !domains.length
      ? this.renderEmpty('You have no domains')
      : domains.map(tx => <div>I am a domain</div>);
  }

  render() {
    const { account, balance } = this.props;

    return (
      <div className="account">
        <div className="account__address">{account}</div>
        <div className="account__header">
          <div className="account__balance-wrapper">
            <div className="account__balance-wrapper__label">
              Current Balance
            </div>
            <div className="account__balance-wrapper__amount">
              {`HNS ${+balance.toFixed(5)}`}
              </div>
          </div>
          <div className="account__actions">
            <button className="btn-secondary account__btn">Add proof, get coins</button>
          </div>
        </div>
        <div className="account__content">
          <div className="account__transactions">
            <div className="account__panel-title">Your Recent Transactions</div>
            { this.renderTransactions() }
          </div>
          <div className="account__domains">
            <div className="account__panel-title">Your Domains</div>
            { this.renderDomains() }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({

  }),
)(Account);
