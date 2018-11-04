import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import StatusBar from '../../StatusBar/index.js';
import './importwarning.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class ImportSeedWarning extends Component {

  static propTypes = {};

  state = {
    agreementConfirmed: false,
  }

  handleAgreementClick() {
    const agreement = this.state.agreementConfirmed;
    this.setState({ agreementConfirmed: !agreement });
  }

  render() {
    const { agreementConfirmed } = this.state;

    return (
      <div className='extension_primary_section'>
        <div className='import_back_button subheader_text clickable' onClick={() => {this.props.actions.setView('default')}}>
          <span className='directional_symbol import_back'>
            <i className="arrow left"></i>
          </span>
          <span>
            Back
          </span>
        </div>
        <div className='import_status_bar'>
          <StatusBar currentStep={1} totalSteps={6} />
        </div>
        <div className='header_text'>
          Import your Seed Phrase
        </div>

        <div className='subheader_text import_warning_text'>
          <span>This option is</span>
          <span className='subheader_text__accent'> not secure</span>
          <span>
            . Entering your mnemonic seed on any website is dangerous. You could lose all your funds if you accidentally visit a phishing website or if this extension is compromised.
          </span>
        </div>

        <div className='import_user_input'>
          <span className='import_checkbox_wrapper' onClick={this.handleAgreementClick.bind(this)}>
            <div className={agreementConfirmed ? 'import-checkbox-container import-checkbox-container__active' :  'import-checkbox-container'}>
              <div className={agreementConfirmed ? 'import-checkbox-symbol' : ''}> <div></div> </div>
            </div>
          </span>
          <span className='import_checkbox_text subheader_text'>
            I understand I am selecting the least secure option, making my funds vulnerable to attack.
          </span>
        </div>
        <button
          className={classNames(['import_cta', agreementConfirmed ? 'import_cta_button__active' : 'import_cta_button'])}
          onClick={() => {this.props.actions.setView('default')}}
        >
          I Agree, Continue
        </button>
        <div className='subheader_text import_text_description'>
          I want the most secure option!
        </div>
        <div className='subheader_text__accented import_text_purchase_description' onClick={() => {}}>
          Buy Ledger Nano S
        </div>
      </div>
    );
  }
}
