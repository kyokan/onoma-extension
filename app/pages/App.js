import React, { Component } from 'react';
import ExtensionDefault from '../components//Extension/Default/index.js';
import ExtensionCreatePassword from '../components/Extension/CreatePassword/index.js';
import ExtensionAccessFundsOptions from '../components/Extension/FundAccessOptions/index.js';
import ExtensionTerms from '../components//Extension/Terms/index.js';
import ExtensionConnectLedger from '../components//Extension/ConnectLedger/index.js';
import ImportSeedWarning from '../components//Extension/ImportSeedWarning/index.js';
import ImportSeedEnterPassphrase from '../components/Extension/ImportSeedEnterPassphrase/index.js';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';

@connect(
  function mapStateToProps(state) {
    return {
      currentView: state.extension.currentView,
    };
  },
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    currentView: PropTypes.string,
  };

  render() {
    const { currentView } = this.props;

    return (
      <ImportSeedEnterPassphrase />
    );

    if (currentView === 'seed-phrase-warning') {
      return (
        <ImportSeedWarning />
      );
    }

    if (currentView === 'connect-ledger') {
      return (
        <ExtensionConnectLedger />
      );
    }

    if (currentView === 'terms-and-conditions') {
      return (
        <ExtensionTerms />
      );
    }

    if (currentView === 'access-funds-show-options') {
      return (
        <ExtensionAccessFundsOptions />
      );
    }

    if (currentView === 'create-password') {
      return (
        <ExtensionCreatePassword />
      );
    }

    if (currentView === 'default') {
      return (
        <ExtensionDefault />
      )
    }

    return (
      <div> View Not Yet Defined </div>
    );
  }
}
