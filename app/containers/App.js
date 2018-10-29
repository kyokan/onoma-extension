import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './App.css';
import extension from 'extensionizer';
import classNames from 'classnames';
import ExtensionDefault from '../components/extensionDefault.js';
import ExtensionCreatePassword from '../components/extensionCreatePassword.js';

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

    if (this.props.currentView === 'create-password') {
      return (
        <ExtensionCreatePassword />
      )
    }

    if (this.props.currentView === 'default') {
      return (
        <ExtensionDefault />
      )
    }

    return (
      <div> View Not Yet Defined </div>
    );
  }
}
