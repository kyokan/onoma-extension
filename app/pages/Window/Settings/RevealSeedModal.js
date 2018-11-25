import React, { Component } from 'react';
import MiniModal from '../../../components/Modal/MiniModal';
import './reveal-seed-modal.scss';

class RevealSeedModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPhrase: false
    };
  }

  onClickReveal = () => {
    this.setState({
      showPhrase: true
    });
  };

  render() {
    return (
      <MiniModal closeRoute="/settings" title="Reveal your seed phrase" centered>
        {this.state.showPhrase ? this.renderPhrase() : this.renderPassword()}
      </MiniModal>
    );
  }

  renderPhrase() {
    return (
      <React.Fragment>
        <div className="reveal-seed-modal__instructions">
          Enter your password to reveal your seed phrase.
        </div>
        <div className="reveal-seed-modal__seed-phrase">
          mouse ring unicorn hole jack mellow team dreamy tiny volume purse hollow mouse ring unicorn hole jack mellow team dreamy tiny volume purse hollow
        </div>
      </React.Fragment>
    );
  }

  renderPassword() {
    return (
      <React.Fragment>
        <div className="reveal-seed-modal__instructions">
          Enter your password to reveal your seed phrase.
        </div>
        <input type="password" className="reveal-seed-modal__password" placeholder="Your password" />
        <button className="reveal-seed-modal__submit" onClick={this.onClickReveal}>
          Reveal recovery phrase
        </button>
      </React.Fragment>
    );
  }
}

export default RevealSeedModal;