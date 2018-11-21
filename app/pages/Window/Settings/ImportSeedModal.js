import React, { Component } from 'react';
import MiniModal from '../../../components/Modal/MiniModal';
import './import-seed-modal.scss';

export default class ImportSeedModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptances: [false, false]
    }
  }

  toggleCheck(i) {
    return () => {
      const acceptances = this.state.acceptances;
      acceptances[i] = !acceptances[i];

      this.setState({
        acceptances
      });
    }
  }

  checkDisabled = () => {
    return !this.state.acceptances[0] || !this.state.acceptances[1];
  };

  render() {
    return (
      <MiniModal closeRoute="/settings" title="Are you sure you want to do this?">
        <div className="import-seed-modal__instructions">
          You are about to remove your current wallet from this Chrome extension. Be sure you have your
          current recovery seed phrase saved somewhere safe before proceeding.
        </div>
        <div className="import-seed-modal__checkbox">
          <div className="import-seed-modal__checkbox-wrap">
            <input type="checkbox" onChange={this.toggleCheck(0)} value={this.state.acceptances[0]} />
            <div className="import-seed-modal__check" />
          </div>
          <div className="import-seed-modal__checkbox-label">
            I understand that I need my recovery seed phrase to log in again.
          </div>
        </div>
        <div className="import-seed-modal__checkbox">
          <div className="import-seed-modal__checkbox-wrap">
            <input type="checkbox" onChange={this.toggleCheck(1)} value={this.state.acceptances[1]} />
            <div className="import-seed-modal__check" />
          </div>
          <div className="import-seed-modal__checkbox-label">
            I understand that there will be no way to recover my wallet without my current seed phrase,
            and will be permanently locked out without it.
          </div>
        </div>
        <button className="import-seed-modal__submit-button" disabled={this.checkDisabled()}>
          Remove current wallet and import another seed
        </button>
      </MiniModal>
    )
  }
}