import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './App.css';
import extension from 'extensionizer';
import classNames from 'classnames';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  openExtensionInBrowser (route = null, queryString = null) {
    let extensionURL = extension.runtime.getURL('window.html')

    // if (queryString) {
    //   extensionURL += `?${queryString}`
    // }

    // if (route) {
    //   extensionURL += `#${route}`
    // }
    console.log('extensionUrl:', extensionURL)
    extension.tabs.create({ url: extensionURL })
  }

  render() {
    const { todos, actions } = this.props;

    return (
      <div>
        <div> onoma wallet </div>
        <div> Take control of your Handshake coins and domain names. </div>
        <button> Get Started </button>
        <br></br>
        <div onClick={this.openExtensionInBrowser}> Browse Domains </div>
        <div> Information </div>

        <div> Resolve on Handshake </div>
        <div> Version 1.0 </div>
        <div> Current Height: </div>
      </div>
    );
  }
}
