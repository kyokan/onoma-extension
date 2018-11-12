import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../../actions/extension.js';
import './terms.scss';

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators({
      setView: actions.setView,
    }, dispatch)
  })
)
export default class CreatePassword extends Component {

  static propTypes = {};

  render() {

    return (
      <div className='extension_primary_section'>
        <div className='subheader_text clickable' onClick={() => {this.props.actions.setView('default')}}>
          <span className='directional_symbol terms_back'>
            <i className="arrow left"></i>
          </span>
          <span>
            Back
          </span>
        </div>
        <div className='extension_primary_line_break terms_line_break'> </div>
        <div className='header_text'> Terms of Use </div>
        <div className='subheader_text terms_subheader'> Please carefully review and agree to the Terms of Use.</div>
        <button className='terms_button clickable'>
          <span> Terms of Use </span>
        {/* Default: Link out to external resource. Need to Chat with team regarding branding, where to host these terms. */}
          <span className='directional_symbol terms_forward_arrow'>
            <i className="right"></i>
          </span>
        </button>

        <button className='extension_cta_button terms_cta' onClick={() => {this.props.actions.setView('default')}}> I Agree </button>
      </div>
    );
  }
}
