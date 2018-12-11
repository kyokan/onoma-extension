import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImportSeedWarning from '../ImportSeedWarning';
import CreatePassword from '../CreatePassword';
import ImportSeedEnterMnemonic from '../ImportSeedEnterMnemonic';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as walletActions from '../../../ducks/wallet';
import Terms from '../Terms';
import client from '../../../utils/client';
import { CREATE_WALLET, IMPORT_SEED } from '../../../../chrome/extension/background/actionTypes';

const TERM_OF_USE = 'TERM_OF_USE';
const WARNING_STEP = 'WARNING';
const CREATE_PASSWORD = 'CREATE_PASSWORD';
const ENTRY_STEP = 'ENTRY';

@connect(
  state => ({}),
  dispatch => ({
    importSeed: (passphrase, mnemonic) => dispatch(walletActions.importSeed(passphrase, mnemonic)),
    completeInitialization: () => dispatch(walletActions.completeInitialization()),
  })
)
@withRouter
export default class ImportSeedFlow extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    completeInitialization: PropTypes.func.isRequired,
    importSeed: PropTypes.func.isRequired,
  };

  state = {
    currentStep: TERM_OF_USE,
    passphrase: '',
  };

  render() {
    switch (this.state.currentStep) {
      case TERM_OF_USE:
        return (
          <Terms
            onAccept={() => this.setState({ currentStep: WARNING_STEP })}
            onBack={() => this.props.history.push('/funding-options')}
          />
        );
      case WARNING_STEP:
        return (
          <ImportSeedWarning
            currentStep={1}
            totalSteps={3}
            onBack={() => this.goTo(TERM_OF_USE)}
            onNext={() => this.goTo(CREATE_PASSWORD)}
            onCancel={() => this.props.history.push('/funding-options')}
          />
        );
      case CREATE_PASSWORD:
        return (
          <CreatePassword
            currentStep={2}
            totalSteps={3}
            onBack={() => this.setState({currentStep: WARNING_STEP})}
            onNext={passphrase => {
              this.setState({
                passphrase,
                currentStep: ENTRY_STEP,
              });
            }}
            onCancel={() => this.props.history.push('/funding-options')}
          />
        );
      case ENTRY_STEP:
        return (
          <ImportSeedEnterMnemonic
            currentStep={3}
            totalSteps={3}
            onBack={() => this.goTo(CREATE_PASSWORD)}
            onNext={this.finishFlow}
            onCancel={() => this.props.history.push('/funding-options')}
          />
        );
    }
  }

  goTo(currentStep) {
    this.setState({
      currentStep,
    });
  }

  finishFlow = async (mnemonic) => {
    try {
      await this.props.importSeed(this.state.passphrase, mnemonic);
      await this.props.completeInitialization();
    } catch (e) {
      console.error(e);
    }
  };
}
