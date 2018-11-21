import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../../../ducks/extension';
import './terms.scss';

@connect(
  null,
  dispatch => ({
    setView: viewType => dispatch(actions.setView(viewType)),
  })
)
export default class CreatePassword extends Component {

  static propTypes = {
    setView: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
  };

  state = {
    hasAccepted: false,
  };

  toggleTerms = () => this.setState({ hasAccepted: !this.state.hasAccepted });

  render() {
    const {
      setView,
      onAccept,
    } = this.props;

    const { hasAccepted } = this.state;

    return (
      <div className="terms">
        <div
          className="terms__header clickable"
          onClick={() => setView('default')}
        >
          <i className="arrow left" />
        </div>
        <div className="terms__content">
          <div className="header_text">
            Terms of Use
          </div>
          <div className="subheader_text terms_subheader">
            {'Please review and agree to the Handshake wallet\'s terms of use.'}
          </div>
          <button
            className={c('terms__button', { 'terms__button--accepted': hasAccepted })}
            onClick={this.toggleTerms}
          >
            <span>Terms of Use</span>
            <span className="directional_symbol terms_forward_arrow">
              <i className="right" />
            </span>
          </button>
          <button
            className="extension_cta_button terms_cta"
            onClick={onAccept}
            disabled={!hasAccepted}
          >
            Accept
          </button>
        </div>
      </div>
    );
  }
}
