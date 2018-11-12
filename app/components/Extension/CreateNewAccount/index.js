import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Terms from '../Terms';
import CreatePassword from '../CreatePassword';
import CopySeed from '../CopySeed';
import ConfirmSeed from '../ConfirmSeed';
import client from '../../../utils/client';

const TERM_OF_USE = 0;
const CREATE_PASSWORD = 1;
const COPY_SEEDPHRASE = 2;
const CONFIRM_SEEDPHRASE = 3;

export default class CreateNewAccount extends Component {

  static propTypes = {

  };

  state = {
    currentStep: TERM_OF_USE,
    password: '',
    confirmPassword: '',
    seedphrase: '',
    address: '',
  };

  render() {
    switch (this.state.currentStep) {
      case TERM_OF_USE:
        return (
          <Terms
            currentStep={1}
            totalSteps={4}
            onAccept={() => this.setState({ currentStep: CREATE_PASSWORD })}
          />
        );
      case CREATE_PASSWORD:
        return (
          <CreatePassword
            currentStep={2}
            totalSteps={4}
            onBack={() => this.setState({ currentStep: TERM_OF_USE })}
            onNext={() => {
              const { password, confirmPassword } = this.state;
              if (password === confirmPassword) {
                client.dispatch({ type: 'createWallet', payload: password })
                  .then(({ address, seed }) => {
                    this.setState({
                      address,
                      seedphrase: seed,
                      currentStep: COPY_SEEDPHRASE,
                    });
                  });
              }
            }}
            onPasswordChange={password => this.setState({ password })}
            onConfirmPasswordChange={confirmPassword => this.setState({ confirmPassword })}
          />
        );
      case COPY_SEEDPHRASE:
        return (
          <CopySeed
            currentStep={3}
            totalSteps={4}
            seedphrase={this.state.seedphrase}
            onBack={() => this.setState({ currentStep: CREATE_PASSWORD })}
            onNext={() => this.setState({ currentStep: CONFIRM_SEEDPHRASE })}
          />
        );
      case CONFIRM_SEEDPHRASE:
        return (
          <ConfirmSeed
            currentStep={4}
            totalSteps={4}
            seedphrase={this.state.seedphrase}
            onBack={() => this.setState({ currentStep: COPY_SEEDPHRASE })}
            onNext={() => alert(this.state.address)}
          />
        );
      default:
        return <noscript />;
    }
  }
}
