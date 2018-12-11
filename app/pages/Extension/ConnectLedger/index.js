import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as extensionActions from '../../../ducks/extension';
import ConnectLedgerStep from './ConnectLedgerStep';
import './connect.scss';

const COMPLETE = 'complete';
const INCOMPLETE = 'incomplete';

@connect(
  state => ({}),
  dispatch => ({
    setView: viewType => dispatch(extensionActions.setView(viewType)),
  }),
)
@withRouter
export default class ConnectLedger extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    stepOne: INCOMPLETE,
    stepTwo: INCOMPLETE,
    stepThree: COMPLETE,
  };

  allStepsComplete() {
    const { stepOne, stepTwo, stepThree } = this.state;
    if (
      stepOne === COMPLETE &&
      stepTwo === COMPLETE &&
      stepThree === COMPLETE
    ) {
      return true;
    }
    return false;
  }

  finishFlow() {
    if (this.allStepsComplete()) {
      return console.log('DONEEEEZO');
    }
    return console.log('Not donezo :(');
  }

  render() {
    const { stepOne, stepTwo, stepThree } = this.state;

    const ctaClasses = classNames([
      'connect_cta',
      this.allStepsComplete() ? 'connect_cta__active' : false,
    ]);

    return (
      <div className="extension_primary_section">
        <div
          className="subheader_text clickable"
          onClick={() => {
            this.props.history.push('/existing-options');
          }}
        >
          <span className="directional_symbol connect_back">
            <i className="arrow left" />
          </span>
          <span>Back</span>
        </div>
        <div className="extension_primary_line_break connect_line_break" />
        <div className="header_text connect_header"> Connect your Ledger </div>

        <ConnectLedgerStep
          number={1}
          description={'Connect your Ledger wallet directly to your computer'}
          // unsure if this is the best way to render `completeness`
          complete={stepOne === COMPLETE}
        />
        <ConnectLedgerStep
          number={2}
          description={'Enter your secret pin on your Ledger device'}
          complete={stepTwo === COMPLETE}
        />
        <ConnectLedgerStep
          number={3}
          description={'Select the Handshake app on your Ledger device'}
          complete={stepThree === COMPLETE}
        />

        <button
          className={ctaClasses}
          onClick={() => {
            this.finishFlow();
          }}
        >
          Unlock Ledger
        </button>

        <div className="connect_support_cta">Need help? Visit support page</div>
      </div>
    );
  }
}
