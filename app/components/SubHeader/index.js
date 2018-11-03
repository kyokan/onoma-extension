import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './subheader.scss';

class SubHeader extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  };
a
  render() {
    const { history: { push } } = this.props;
    return (
      <div className="subheader">
        <div className="subheader__content">
          <div className="subheader__actions">
            <a className="subheader__action" onClick={() => push('/account')}>Account</a>
            <a className="subheader__action">Send</a>
            <a className="subheader__action">Receive</a>
            <a className="subheader__action" onClick={() => push('/get_coins')}>Get Coins</a>
            <a className="subheader__action" onClick={() => push('/settings')}>Settings</a>
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

export default withRouter(SubHeader);
