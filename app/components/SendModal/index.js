import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BigNumber as bn } from 'bignumber.js';
import Modal from '../Modal';
import './send.scss';

const SLOW = 'Slow';
const STANDARD = 'Standard';
const FAST = 'Fast';

export default class SendModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  state = {
    gasFee: bn(0.00027),
    selectedGasOption: STANDARD,
  };

  render() {
    const { onClose } = this.props;
    const { selectedGasOption, gasFee } = this.state;

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
                  <div>{selectedGasOption}</div>
                  <select
                    onChange={e => this.setState({ selectedGasOption: e.target.value })}
                    value={selectedGasOption}
                  >
                    <option value={SLOW}>Slow</option>
                    <option value={STANDARD}>Standard</option>
                    <option value={FAST}>Fast</option>
                  </select>
                </div>
                <div className="send__network-fee__fee-amount">
                  {`${gasFee} HNS`}
                </div>
              </div>
              <div className="send__estimated-time">
                {`Est. delivery 5-10 mins`}
              </div>
            </div>
          </div>
          <div className="send__actions">
            <button className="send__cta-btn" disabled>Continue</button>
          </div>
        </div>
      </Modal>
    );
  }
}
