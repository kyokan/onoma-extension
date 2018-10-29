import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        I am a window app
      </div>
    );
  }
}
