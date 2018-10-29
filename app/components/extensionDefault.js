import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import style from './App.css';
import classNames from 'classnames';
import actions from '../actions/extension.js';
console.log('actions:', actions);

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {};

  render() {

    return (
      <div>
        <div> onoma wallet </div>
        <div> Take control of your Handshake coins and domain names. </div>
        <button> Get Started </button>
        <br></br>
        <div onClick={()=>{
          console.log('actions', actions);
          actions.openExtensionInBrowser();
        }}> Browse Domains </div>
        <div> Information </div>

        <div> Resolve on Handshake </div>
        <div> Version 1.0 </div>
        <div> Current Height: </div>
      </div>
    );
  }
}
