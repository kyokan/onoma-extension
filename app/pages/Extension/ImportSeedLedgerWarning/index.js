import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import StatusBar from '../../../components/StatusBar/index.js';
import './importledger.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
      openExtensionInBrowser: actions.openExtensionInBrowser,
    }, dispatch)
  })
)

export default class ImportSeedLedgerWarning extends Component {

  static propTypes = {};

  render() {
    const currentStep = 5;
    const totalSteps = 5;

    return (
      <div className='extension_primary_section'>
        <div className='import_ledger_back_button subheader_text clickable' onClick={() => {this.props.actions.setView('default')}}>
          <span className='directional_symbol import_ledger_back'>
            <i className="arrow left"></i>
          </span>
          <span>
            Back
          </span>
        </div>
        <div className='import_ledger_status_bar'>
          <StatusBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className='subheader_text import_ledger_subtext' style={{ fontWeight: 500 }}>
          Back up your secret seed phrase on a hardware device
        </div>

        <div className='subheader_text import_ledger_subtext'>
          <div>
            It is <span style={{ fontWeight: 600 }}> highly recommended </span> that you invest in a hardware device to safely and securely manage your funds.
          </div>
        </div>

        <button
          className={classNames(['import_ledger_cta', 'import_ledger_cta_button__active', 'import_ledger_cta_button'])}
          onClick={() => {this.props.actions.setView('default')}}
        >
          Buy Ledger Nano S
        </button>

        {
          /*
            Area Left Intentionally Blank
            https://projects.invisionapp.com/d/main/default/#/console/15796537/329321984/preview
            Fill in with SVG when it arrives.
           */
        }

        <button
          className={classNames(['import_ledger_cta_button', 'import_ledger_cta_button__inverted'])}
          onClick={() => {this.props.actions.openExtensionInBrowser}}
        >
          Go to Dashboard
        </button>

      </div>
    );
  }
}
