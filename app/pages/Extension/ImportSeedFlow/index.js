import React, { Component } from 'react';
import ImportSeedWarning from '../ImportSeedWarning';
import CreatePassword from '../CreatePassword';
import ImportSeedEnterPassphrase from '../ImportSeedEnterPassphrase';
import { withRouter } from 'react-router-dom';

const WARNING_STEP = 'WARNING';
const PASSWORD_STEP = 'PASSWORD';
const ENTRY_STEP = 'ENTRY';

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
          <ImportSeedEnterPassphrase
            currentStep={3}
            totalSteps={3}
            onBack={() => this.goTo(PASSWORD_STEP)}
            onNext={() => ({})}
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
      password: pw
    });
    this.goTo(ENTRY_STEP);
  }
}