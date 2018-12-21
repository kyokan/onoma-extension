import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import c from 'classnames';
import Hash from '../../../components/Hash';
import * as extensionActions from '../../../ducks/extension';
import './home.scss';

@connect(
  state => ({
    height: state.chain.height,
    chainHeight: state.chain.chainHeight,
    currentHash: state.chain.currentHash,
    synced: state.chain.synced,
    isSynchronizing: state.chain.isSynchronizing,
  }),
  dispatch => ({
    toggleResolve: () => dispatch(extensionActions.toggleResolve()),
  }),
)
class Home extends Component {
  static propTypes = {
    currentHash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    chainHeight: PropTypes.number.isRequired,
    toggleResolve: PropTypes.func.isRequired,
    synced: PropTypes.bool.isRequired,
    isSynchronizing: PropTypes.bool.isRequired,
  };

  state = {
    isToggledOn: !!localStorage.getItem('shouldResolveOnHandshake'),
  };

  toggle = () => {
    this.setState(
      {
        isToggledOn: !this.state.isToggledOn,
      },
      this.props.toggleResolve,
    );
  };

  isSynced = () => this.props.synced && !this.props.isSynchronizing;
  isNotSynced = () => !this.props.synced && !this.props.isSynchronizing;

  renderSynced = () => {
    const { synced, isSynchronizing } = this.props;

    if (isSynchronizing) {
      return 'Synchronizing';
    }

    if (synced) {
      return 'Synchronized';
    }

    return 'Not Synchronized';
  };

  render() {
    const { currentHash, height, isSynchronizing } = this.props;
    return (
      <div className="home">
        <div className="home__header" />
        <div className="home__content">
          <div className="home__content__explanation">
            <div className="home__content__explanation__headline">
              Resolve on Handshake
            </div>
            <div className="home__content__explanation__text">
              Push the button to enter the new web. To see it working, visit the
              HNS domain{' '}
              <a
                className="home__content__explanation__link"
                target="_blank"
                rel="noopener noreferrer"
                href="http://megatest/"
              >
                .megatest/
              </a>
            </div>
          </div>
          <div
            className={c('home__content__power', {
              'home__content__power--on': this.state.isToggledOn,
            })}
            onClick={this.toggle}
          >
            <div className="home__content__power__icon" />
          </div>
        </div>
        <div
          className={c('home__footer', {
            'home__footer--syncing': isSynchronizing,
            'home__footer--success': this.isSynced(),
            'home__footer--failure': this.isNotSynced(),
          })}
        >
          <div className="home__footer__status-wrapper">
            <div
              className={c('home__footer__status', {
                'home__footer__status--syncing': isSynchronizing,
                'home__footer__status--success': this.isSynced(),
                'home__footer__status--failure': this.isNotSynced(),
              })}
            >
              {this.renderSynced()}
            </div>
          </div>
          <div className="home__footer__row">
            <div className="home__footer__description">Current Height: </div>
            <div className="home__footer__highlight">{height}</div>
          </div>
          <div className="home__footer__row">
            <div className="home__footer__description">Current Hash: </div>
            <div className="home__footer__highlight">
              <Hash value={currentHash} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
