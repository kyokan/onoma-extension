import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { VIEW_TYPES } from '../ducks/extension';
import ExtensionDefault from '../components/Extension/Default';
import FundAccessOptions from '../components/Extension/FundAccessOptions';
import CreateNewAccount from '../components/Extension/CreateNewAccount';

// import client from '../utils/client';

// import ExtensionCreatePassword from '../components/Extension/CreatePassword';
// import ExtensionAccessFundsOptions from '../components/Extension/FundAccessOptions';
// import ExtensionTerms from '../components/Extension/Terms';
// import ExtensionConnectLedger from '../components/Extension/ConnectLedger';
// import ImportSeedWarning from '../components/Extension/ImportSeedWarning';
// import ImportSeedEnterPassphrase from '../components/Extension/ImportSeedEnterPassphrase';
// import ImportSeedLedgerWarning from '../components/Extension/ImportSeedLedgerWarning';
// import Account from '../components/Extension/Account';
// import AccountLogin from '../components/Extension/AccountLogin';


import './App.scss';

@connect(
  function mapStateToProps(state) {
    return {
      currentView: state.extension.currentView,
    };
  },
  dispatch => ({
    actions: bindActionCreators({}, dispatch),
  })
)
export default class App extends Component {
  static propTypes = {
    currentView: PropTypes.string,
  };

  render() {
    const { currentView } = this.props;

    switch (currentView) {
      case VIEW_TYPES.DEFAULT:
        return <ExtensionDefault />;
      case VIEW_TYPES.CREATE_ACCOUNT_OPTIONS:
        return <FundAccessOptions />;
      case VIEW_TYPES.CREATE_NEW_ACCOUNT:
        return <CreateNewAccount />;
    }

    // return (
    //   <AccountLogin />
    // );

    // return (
    //   <Account />
    // );

    // return (
    //   <ImportSeedLedgerWarning />
    // );

    // if (currentView === 'import-seed-enter-passphrase') {
    //   return (
    //     <ImportSeedEnterPassphrase />
    //   );
    // }
    //
    // if (currentView === 'seed-phrase-warning') {
    //   return (
    //     <ImportSeedWarning />
    //   );
    // }
    //
    // if (currentView === 'connect-ledger') {
    //   return (
    //     <ExtensionConnectLedger />
    //   );
    // }
    //
    // if (currentView === 'terms-and-conditions') {
    //   return (
    //     <ExtensionTerms />
    //   );
    // }

    // if (currentView === 'access-funds-show-options') {
    //   return (
    //     <ExtensionAccessFundsOptions />
    //   );
    // }

    // if (currentView === 'create-password') {
    //   return (
    //     <ExtensionCreatePassword />
    //   );
    // }
    //
    // if (currentView === 'default') {
    //   return (
    //     <ExtensionDefault />
    //   )
    // }

    return (
      <div> View Not Yet Defined </div>
    );
  }
}
