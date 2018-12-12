import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ConnectLedgerStep extends Component {
  static propTypes = {
    stepNumber: PropTypes.number.isRequired,
    stepDescription: PropTypes.string.isRequired,
    stepCompleted: PropTypes.bool.isRequired,
  };

  render() {
    const { stepNumber, stepDescription, stepCompleted } = this.props;
    return (
      <div className="connect_status_pill">
        <span className="connect_status_number">{stepNumber}</span>
        <span className="connect_status_text">{stepDescription}</span>
        <span className="connect_status_symbol">
          <div
            className={classNames('ledger-circle-check-container', {
              'ledger-circle-check-container__active': stepCompleted,
            })}
          >
            <div className="ledger-circle-check-symbol" />
          </div>
        </span>
      </div>
    );
  }
}
