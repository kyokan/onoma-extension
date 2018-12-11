import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ConnectLedgerStep extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  };

  render() {
    const { number, description, complete } = this.props;
    return (
      <div className="connect_status_pill">
        <span className="connect_status_number">{number}</span>
        <span className="connect_status_text">{description}</span>
        <span className="connect_status_symbol">
          <div
            className={classNames('ledger-circle-check-container', {
              'ledger-circle-check-container__active': complete,
            })}
          >
            <div className="ledger-circle-check-symbol" />
          </div>
        </span>
      </div>
    );
  }
}
