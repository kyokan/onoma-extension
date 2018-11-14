import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import './index.scss';

export default class AccountDropdown extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
    currentIndex: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    currentIndex: 0,
    onChange() {},
  };

  state = {
    isOpen: false,
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  select(i) {
    this.setState({ isOpen: false });
    this.props.onChange(i);
  }

  render() {
    const { items, currentIndex, onChange } = this.props;
    const { label: currentLabel } = items[currentIndex] || {};

    return (
      <div
        className={c('account-selector', {
          'account-selector--opened': this.state.isOpen,
        })}
      >
        <div className="account-selector__current-item" onClick={this.toggle}>
          <div className="account-selector__current-item__text">
            {currentLabel}
          </div>
        </div>
        <div className="account-selector__options">
          {items.map(({ label }, i) => (
            <div
              key={i}
              className="account-selector__option"
              onClick={() => this.select(i)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
