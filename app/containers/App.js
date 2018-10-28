import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';
import extension from 'extensionizer';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
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
        <div> Onoma (Popup) </div>
        <button onClick={this.openExtensionInBrowser}> Browse Domains </button>
      </div>
    );
  }
}
