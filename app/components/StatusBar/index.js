import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
// import actions from '../../../actions/extension.js';
import './status.scss';

@connect(
  state => ({
  }),
  // dispatch => ({
  //   actions: bindActionCreators({
  //     setView: actions.setView,
  //   }, dispatch)
  // })
)

export default class ConnectLedger extends Component {

  static propTypes = {
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
  };

  static defaultProps = {
    currentStep: 1,
    totalSteps: 3,
  }

  renderStatusBar() {
    const { currentStep , totalSteps } = this.props;
    console.log(currentStep, totalSteps);

    let elements = [];

    for (let i = 0; i < this.props.totalSteps; i++) {
      elements.push(
        <span
          className={
            classNames([
              'status_bar_element',
              i < currentStep ? 'status_bar_element__active' : false
            ])
          }
        >
        </span>
      )
    }

    return elements;
  }

  render() {
    const { currentStep, totalSteps } = this.props;
    const barSegments = this.renderStatusBar();

    return (
        <div className='status_bar_container'>
          <span className='status_bar'>
            {barSegments}
          </span>
          <span>
            {currentStep + `/` + totalSteps}
          </span>
        </div>
    );
  }
}
