import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../ducks/extension';
import StatusBar from '../../../components/StatusBar/index.js';
import './importenter.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)

export default class ImportSeedEnterPassphrase extends Component {

  static propTypes = {};

  state = {
    agreementConfirmed: false,
  }

  render() {
    const { agreementConfirmed } = this.state;
    const currentStep = 2;
    const totalSteps = 3;
    const steps = agreementConfirmed ? currentStep + 1 : currentStep;
    const importPlaceholder = 'Enter or paste your mnemonic seed phrase here';

    return (
      <div className="create-password">
        <div className="create-password__header">
          <i className="arrow left clickable" onClick={() => {}} />
          <span className="create-password__cancel">
            Cancel
          </span>
        </div>
        <div className="create-password__status-bar">
          <StatusBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <div className="create-password__content">
          <div className='header_text'>
            Sign in with your seed phrase
          </div>

          <div className='subheader_text import_enter_warning_text'>
            <div>
              This is the 24-word phrase that was given to you when your wallet was created.
            </div>
            <div className='subheader_text_separator'>
            </div>
            <div>
              Faucet participants: this phrase was given to you when you signed up.
            </div>
          </div>


          <div>
            <textarea className='import_enter_textarea' placeholder={importPlaceholder} />
          </div>

          <button
            className={classNames(['import_enter_cta', agreementConfirmed ? 'import_enter_cta_button__active' : 'import_enter_cta_button'])}
            onClick={() => {this.props.actions.setView('default')}}
          >
            Unlock funds
          </button>
        </div>
      </div>
    );
  }
}
