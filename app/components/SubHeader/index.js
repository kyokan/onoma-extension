import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SendModal from '../SendModal';
import ReceiveModal from '../ReceiveModal';

import './subheader.scss';

class SubHeader extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  };

  state = {
    isShowingSendModal: false,
    isShowingReceiveModal: false,
  };

  openSendModal = () => this.setState({ isShowingSendModal: true, isShowingReceiveModal: false });
  openReceiveModal = () => this.setState({ isShowingSendModal: false, isShowingReceiveModal: true });
  closeModal = () => this.setState({ isShowingSendModal: false, isShowingReceiveModal: false });

  renderModal() {
    const { isShowingReceiveModal, isShowingSendModal } = this.state;

    if (isShowingReceiveModal) {
      return <ReceiveModal onClose={this.closeModal} />;
    }

    if (isShowingSendModal) {
      return <SendModal onClose={this.closeModal} />;
    }

    return null;
  }

  render() {
    const { history: { push } } = this.props;
    return (
      <div className="subheader">
        <div className="subheader__content">
          <div className="subheader__actions">
            <a className="subheader__action" onClick={() => push('/account')}>Account</a>
            <a className="subheader__action" onClick={this.openSendModal}>Send</a>
            <a className="subheader__action" onClick={this.openReceiveModal}>Receive</a>
            <a className="subheader__action" onClick={() => push('/get_coins')}>Get Coins</a>
            <a className="subheader__action" onClick={() => push('/settings')}>Settings</a>
          </div>
          <div className="subheader__search">
            <input className="subheader__search__input" type="text" placeholder="Lookup top-level domain" />
            <div className="subheader__search__icon">🔍</div>
          </div>
        </div>
        { this.renderModal() }
      </div>
    )
  }
};

export default withRouter(SubHeader);
