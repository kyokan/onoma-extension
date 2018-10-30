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

  render() {
    const { history: { push } } = this.props;
    return (
      <div className="subheader">
        <div className="subheader__content">
          <div className="subheader__actions">
            <div className="subheader__action" onClick={() => push('/account')}>Account</div>
            <div className="subheader__action">Send</div>
            <div className="subheader__action">Receive</div>
            <div className="subheader__action" onClick={() => push('/get_coins')}>Get Coins</div>
            <div className="subheader__action" onClick={() => push('/settings')}>Settings</div>
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
