import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
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
        <SubHeader />
        I am a window app
      </div>
    );
  }
}
