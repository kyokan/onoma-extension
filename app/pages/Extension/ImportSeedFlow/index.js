import React, { Component } from 'react';
import ImportSeedWarning from '../ImportSeedWarning';
import CreatePassword from '../CreatePassword';
import ImportSeedEnterMnemonic from '../ImportSeedEnterMnemonic';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as walletActions from '../../../ducks/wallet';

const WARNING_STEP = 'WARNING';
const PASSWORD_STEP = 'PASSWORD';
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
  constructor(props) {
    super(props);

    this.state = {
      currentStep: WARNING_STEP
    };
  }

  render() {
    switch (this.state.currentStep) {
      case WARNING_STEP:
        return (
          <ImportSeedWarning
            currentStep={1}
            totalSteps={3}
            onNext={() => this.goTo(PASSWORD_STEP)}
            onCancel={() => this.props.history.push('/funding-options')}
          />
        );
      case PASSWORD_STEP:
        return (
          <CreatePassword
            currentStep={2}
            totalSteps={3}
            onBack={() => this.goTo(WARNING_STEP)}
            onNext={this.onPasswordNext}
            onCancel={() => this.props.history.push('/funding-options')}
          />
        );
      case ENTRY_STEP:
        return (
          <ImportSeedEnterMnemonic
            currentStep={3}
            totalSteps={3}
            onBack={() => this.goTo(PASSWORD_STEP)}
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

  onPasswordNext = (pw) => {
    this.setState({
      passphrase: pw
    });
    this.goTo(ENTRY_STEP);
  };

  finishFlow = async (mnemonic) => {
    try {
      await this.props.importSeed(this.state.passphrase, mnemonic);
      await this.props.completeInitialization();
    } catch (e) {
      console.error(e);
    }
  };
}