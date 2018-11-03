import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BigNumber as bn } from 'bignumber.js';
import Modal from '../Modal';
import './send.scss';

export default class SendModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  state = {
    gasFee: bn(0.00027),
  };

  render() {
    const { onClose } = this.props;

    return (
      <Modal className="send" onClose={this.props.onClose}>
        <div className="send__container">
          <div className="send__header">
            <div className="send__title">Send funds</div>
            <div className="send__close-btn" onClick={onClose}>✕</div>
          </div>
          <div className="send__content">
            <div className="send__to">
              <div className="send__label">Sending to</div>
              <div className="send__input">
                <input type="text" placeholder="Recipient address" />
              </div>
            </div>
            <div className="send__amount">
              <div className="send__label">Amount</div>
              <div className="send__amount-input">
                <input type="text" placeholder="0.00000" />
                <div className="send__amount-input__max-btn">Send Max</div>
                <div className="send__amount-input__unit">HNS</div>
              </div>
            </div>
            <div className="send__network-fee">
              <div className="send__label">
                <span>Network Fee</span>
                <div className="send__info-icon">ⓘ</div>
              </div>
              <div className="send__network-fee__form">
                <div className="send__network-fee__select">
                  <select>
                    <option>Slow</option>
                    <option>Standard</option>
                    <option>Fast</option>
                  </select>
                </div>
                <div className="send__network-fee__fee-amount">
                  {`${this.state.gasFee} HNS`}
                </div>
              </div>
            </div>
          </div>
          <div className="send__actions">
            <button className="send__cta-btn">Continue</button>
          </div>
        </div>
      </Modal>
    );
  }
}
