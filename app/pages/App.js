import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import ExtensionDefault from '../components//ExtensionDefault/index.js';
import ExtensionCreatePassword from '../components/extensionCreatePassword.js';
import ExtensionAccessFundsOptions from '../components/extensionAccessFundsOptions.js';

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
