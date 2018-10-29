import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.scss';

export default class Header extends Component {
  static propTypes = {
    blockHeight: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  };

  static defaultProps = {
    blockHeight: 1234,
  };

  render() {
    const { blockHeight } = this.props;

    return (
      <div className="header">
        <div className="header__title">
          Handshake Wallet
        </div>
        <div className="header__block-height">
          {`Current Height: ${blockHeight}`}
        </div>
        <div className="header__status">
          Synced
        </div>
      </div>
    );
  }
}
