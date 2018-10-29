import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import './window.scss';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
  }),
)
export default class WindowApp extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div>
        <Header />
        I am a window app
      </div>
    );
  }
}
