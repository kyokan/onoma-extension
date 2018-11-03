import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './App.scss';
import extension from 'extensionizer';
import classNames from 'classnames';
import ExtensionDefault from '../components/extensionDefault.js';
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

  static propTypes = {};

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
