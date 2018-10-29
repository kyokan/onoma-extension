import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './App.css';
import extension from 'extensionizer';
import classNames from 'classnames';
import ExtensionDefault from '../components/extensionDefault.js';

@connect(
  function mapStateToProps(state) {
    console.log('type:', typeof state);
    console.log('type ext:', typeof state.extension);

    return {
      state,
    };
  },
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {};

  render() {
    const { state } = this.props;
    console.log("props:", this.props);
    console.log("state", this.state, this.props.state);

    if (this.props.state.extension.currentView === 'default') {
      return (
        <ExtensionDefault />
      )
    }

    return (
      <div> View Not Yet Defined </div>
    );
  }
}
