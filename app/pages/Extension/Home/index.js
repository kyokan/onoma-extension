import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import c from 'classnames';
import Hash from '../../../components/Hash';
import './home.scss';

@connect(
  state => console.log(state) || ({
    height: state.chain.height,
    currentHash: state.chain.currentHash,
  }),
)
class Home extends Component {
  static propTypes = {
    currentHash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  };

  state = {
    isToggledOn: false,
  };

  toggle = () => this.setState({ isToggledOn: !this.state.isToggledOn });

  render() {
    const { currentHash, height } = this.props;
    return (
      <div className="home">
        <div className="home__header" />
        <div className="home__content">
          <div
            className={c('home__content__power', {
              'home__content__power--on': this.state.isToggledOn,
            })}
            onClick={this.toggle}
          >
            <div className="home__content__power__icon" />
          </div>
        </div>
        <div className="home__footer">
          <div>
            {`Current Height: #${height}`}
          </div>
          <div>
            Current Hash: <Hash value={currentHash} />
          </div>
        </div>
      </div>
    );
  };
}

export default Home;
