import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './subheader.scss';

export default class SubHeader extends Component {
  render() {
    return (
      <div className="subheader">
        <div className="subheader__content">
          <div className="subheader__actions">
            <div className="subheader__action">Account</div>
            <div className="subheader__action">Send</div>
            <div className="subheader__action">Receive</div>
            <div className="subheader__action">Get Coins</div>
            <div className="subheader__action">Settings</div>
          </div>
          <div className="subheader__search">
            <input className="subheader__search__input" type="text" placeholder="Lookup top-level domain" />
            <div className="subheader__search__icon">🔍</div>
          </div>
        </div>
      </div>
    )
  }
};
