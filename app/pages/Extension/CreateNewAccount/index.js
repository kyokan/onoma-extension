import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Terms from '../Terms/index';
import CreatePassword from '../CreatePassword';
import BackUpSeedWarning from '../BackUpSeedWarning';
import CopySeed from '../CopySeed';
import ConfirmSeed from '../ConfirmSeed';
import client from '../../../utils/client';
import { CREATE_WALLET } from '../../../../chrome/extension/background/actionTypes';
import * as walletActions from '../../../ducks/wallet';
import * as extensionDuck from '../../../ducks/extension';
import { withRouter } from 'react-router-dom';

const { VIEW_TYPES } = extensionDuck;
const TERMS_OF_USE = 0;
const CREATE_PASSWORD = 1;
const BACK_UP_SEED_WARNING = 2;
const COPY_SEEDPHRASE = 3;
const CONFIRM_SEEDPHRASE = 4;

@connect(
  null,
  dispatch => ({
    completeInitialization: () => dispatch(walletActions.completeInitialization()),
  }),
)
@withRouter
export default class CreateNewAccount extends Component {

  static propTypes = {
    completeInitialization: PropTypes.func.isRequired,
  };

  state = {
    currentStep: TERMS_OF_USE,
    seedphrase: '',
    address: '',
  };

  render() {
    switch (this.state.currentStep) {
      case TERMS_OF_USE:
        return (
          <Terms
            onAccept={() => this.setState({ currentStep: CREATE_PASSWORD })}
          />
        );
      case CREATE_PASSWORD:
        return (
          <CreatePassword
            currentStep={1}
            totalSteps={3}
            onBack={() => this.setState({currentStep: TERMS_OF_USE})}
            onNext={(password) => {
              client.dispatch({type: CREATE_WALLET, payload: password})
                .then(({address, seed}) => {
                  this.setState({
                    address: address,
                    seedphrase: seed,
                    currentStep: BACK_UP_SEED_WARNING,
                  });
                }).catch(console.error.bind(console));
            }}
          />
        );
      case BACK_UP_SEED_WARNING:
        return (
          <BackUpSeedWarning
            currentStep={2}
            totalSteps={3}
            onBack={() => this.setState({ currentStep: CREATE_PASSWORD })}
            onNext={() => this.setState({ currentStep: COPY_SEEDPHRASE })}
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
            onNext={async () => {
              await this.props.completeInitialization();
              this.props.history.push('/');
            }}
          />
        );
      default:
        return <noscript />;
    }
  }
}
