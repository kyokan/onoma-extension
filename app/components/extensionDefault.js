import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../actions/extension.js';
console.log('actions:', actions);

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {};

  render() {
    console.log("props, state", this.props, this.state);

    return (
      <div>
        <div> onoma wallet </div>
        <div> Take control of your Handshake coins and domain names. </div>
        <button onClick={() => {this.props.actions.setView('create-password')}}> Get Started </button>
        <br></br>
        <div onClick={actions.openExtensionInBrowser}> Browse Domains </div>
        <div> Information </div>

        <div> Resolve on Handshake </div>
        <div> Version 1.0 </div>
        <div> Current Height: </div>
      </div>
    );
  }
}
