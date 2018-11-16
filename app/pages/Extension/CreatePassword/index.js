import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StatusBar from '../../../components/StatusBar/index';
import './create.scss';

const HIGHLIGHT_ONLY = '$$HIGHLIGHT_ONLY$$';

@connect()
export default class CreatePassword extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onConfirmPasswordChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordError: '',
      passwordConfirmation: '',
      passwordConfirmationError: '',
    };
  }

  onClickNext = () => {
    if (this.state.password.length < 8) {
      this.setState({
        passwordError: 'Password must be at least 8 characters long.'
      });
      return;
    }

    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({
        passwordError: HIGHLIGHT_ONLY,
        passwordConfirmationError: 'Passwords do not match.'
      });
      return;
    }

    this.props.onNext(this.state.password)
  };

  onChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const {
      currentStep,
      totalSteps,
      onBack,
    } = this.props;

    return (
      <div className="extension_primary_section create-password">
        <div
          className="subheader_text clickable"
          onClick={onBack}
        >
          <span className="directional_symbol create_back">
            <i className="arrow left" />
          </span>
          <span>Back</span>
        </div>
        <div className="create-password__content">
          <div className="create_status_bar">
            <StatusBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          <div className="header_text">Encrypt your wallet with a password.</div>
          <div
            className={"create-password__input " + (this.state.passwordError ? 'create-password__input--error' : '')}>
            <input
              type="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange('password')}
            />
            {this.renderError('passwordError')}
          </div>
          <div
            className={"create-password__input " + (this.state.passwordConfirmationError ? 'create-password__input--error' : '')}
          >
            <input
              type="password"
              placeholder="Confirm Password"
              value={this.state.passwordConfirmation}
              onChange={this.onChange('passwordConfirmation')}
            />
            {this.renderError('passwordConfirmationError')}
          </div>
        </div>
        <button
          className="extension_cta_button create_cta"
          onClick={this.onClickNext}
        >
          Next
        </button>
      </div>
    );
  }

  renderError(key) {
    const err = this.state[key];
    if (!err || err === HIGHLIGHT_ONLY) {
      return null;
    }

    return (
      <div className="create-password__error">
        {err}
      </div>
    );
  }
}
