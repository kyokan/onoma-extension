import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as domainActions from '../../../ducks/domains';
import { BiddingOpen, BiddingClose } from './Bidding';
import { CloseInfo, OpenInfo, SoldInfo } from './info';
import './auction.scss';

const AVAILABLE = 0;
const SOLD = 1;
const RESERVE = 2;

const LAUNCH_DATE = new Date('December 1, 2018');

function addDays(start = new Date(), days = 0) {
  const ret = new Date();
  ret.setDate(start.getDate() + days);
  return ret;
}

function isEarlierThan(startDate, endDate) {
  return startDate.toISOString().split('T')[0] < endDate.toISOString().split('T')[0];
}

// export const dummyStateExchange = {
//   domain: 'exchange/', // would imagine this comes from react router
//   status: 'SOLD', // would imagine this can be calculated based on biddingOpenBlocks
//   biddingOpenDate: new Date('October 1, 2018'), // is this estimated based on the openBlock?
//   biddingOpenBlock: 2305,
//   biddingCloseDate: new Date('October 23, 2018'),
//   biddingCloseBlock: 3209,
//   bids: [
//     {
//       timePlaced: new Date('October 6, 2018'), // Date,
//       bidder: 'you', // you or hexString,
//       bidAmount: 2500.5 // number HNS
//     },
//     {
//       timePlaced: new Date('October 3, 2018'), // Date,
//       bidder: '0x9349arbitraryhex', // you or hexString,
//       bidAmount: 1200 // number HNS
//     },
//     {
//       timePlaced: new Date('October 4, 2018'), // Date,
//       bidder: '0x342arbitraryhex', // you or hexString,
//       bidAmount: 940, // number HNS
//     },
//     {
//       timePlaced: new Date('October 2, 2018'), // Date,
//       bidder: '0x342arbitraryhex', // you or hexString,
//       bidAmount: 880, // number HNS
//     },
//   ],
//   userBid: 0,
// };

export const ACTION_PROCESS = {
  title: 'The Auction Process',
  0: `
    To prevent price sniping, Handshake uses a blind second-price auction called a Vickrey Auction. Users can buy and register top-level domains (TOLDs) with Handshake coins (HNS).
  `,
  1: `
    In a Vickrey Auction, a participant is only aware of their own bid. The bids are revealed at the end of the auction when a winner is chosen. The winner pays the second highest bid instead of his or her own.
  `,
  2: `
    Names are released weekly during a pre-determined 52 week schedule
  `,
  3: `
    Blind bids can be placed any time after a name is released
  `,
  4: `
    Bidding is open to everyone for 5 days after the reveal period
  `,
  5: `
    Bidders have 10 days to reveal their bid price
  `,
  6: `
    A winner is assigned the name and pays the second highest bid at the end of the reveal period
  `,
  7: `
    Bidders have 10 days to reveal their bid price
  `,
  8: `
    A winner is assigned the name and payes the second highest bid at the end of the reveal period
  `,
  9: `
    The winning bid is burned and permanently removed from circulation
  `,
  10: `
    Losing bids are returned
  `,
  11: `
    Names are renewed annually by paying standard network fee
  `,
  // link here
  12: `
    Read the Handshake paper for more details.
  `
};


const isLimitedTimeRemaining = (biddingCloseDate) => {
  if (!biddingCloseDate) {
    return false;
  }

  return isEarlierThan(addDays(new Date(), 7), biddingCloseDate);
};

const defaultBiddingClose = (
  <div className="auction__group">
    <div className="auction__title">Bidding close</div>
    <div className="auction__large">5 days after the 1st bid</div>
    <div className="auction__block" />
    <div className="auction__small-text auction__limited-time auction__open-bid-description">
      If no bids are placed 7 days after auction opens, this TLD will be randomly assigned a new auction open date to prevent squatting.
    </div>
  </div>
);

const statusToMessage = status => ({
  [AVAILABLE]: <div className="auction__green">Available</div>,
  [SOLD]: <div className="auction__red">Sold</div>,
  [RESERVE]: <div className="auction__black">Reserved</div>,
})[status];

function getSellAmount(status, bids) {
  if (status !== SOLD) {
    return null;
  }
  if (bids.length === 1) {
    return '0.00000 HNS';
  }
  return `${bids[1].bidAmount} HNS`;
}

function getStatus(domain = {}) {
  if (domain.start && domain.start.reserved) {
    return RESERVE;
  }

  if (domain.info && domain.info.owner) {
    return SOLD;
  }

  return AVAILABLE;
}

@withRouter
@connect(
  (state, ownProps) => {
    const domain = state.domains[ownProps.match.params.name] || {};

    return {
      status: getStatus(domain),
      bids: [],
      biddingOpenDate: domain.start ? addDays(LAUNCH_DATE, domain.start.week * 7) : '',
      biddingOpenBlock: domain.start && domain.start.start,
      // TODO: Question - how do we get Close Block?
      biddingCloseBlock: '',
    };
  },
  dispatch => ({
    getNameInfo: tld => dispatch(domainActions.getNameInfo(tld)),
  })
)
export default class Auction extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
    getNameInfo: PropTypes.func.isRequired,
    bids: PropTypes.arrayOf(
      PropTypes.shape({
        timePlaced: PropTypes.instanceOf(Date),
        bidder: PropTypes.string,
        bidAmount: PropTypes.string,
      })
    ).isRequired,
    status: PropTypes.oneOf(AVAILABLE, SOLD, RESERVE),
    biddingCloseBlock: PropTypes.number,
    biddingOpenBlock: PropTypes.number,
    biddingCloseDate: PropTypes.instanceOf(Date),
    biddingOpenDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    biddingCloseBlock: '',
  };

  getDomain = () => this.props.match.params.name;

  componentWillMount() {
    this.props.getNameInfo(this.getDomain());
  }

  renderBiddingClose = () => {
    const { bids, biddingCloseDate, biddingCloseBlock } = this.props;
    return !bids.length
      ? defaultBiddingClose
      : (
        <BiddingClose
          date={biddingCloseDate}
          block={biddingCloseBlock}
        />
      );
  };

  renderAuctionRight = () => {
    const {
      biddingOpenDate,
      biddingCloseDate,
      status,
      bids,
    }= this.props;

    if (status === SOLD) {
      return <SoldInfo bids={bids} status={status} />;
    }

    const isBiddingOpen = biddingOpenDate && (biddingOpenDate.getTime() > new Date().getTime());

    if (isBiddingOpen) {
      return <OpenInfo biddingOpenDate={biddingOpenDate} />;
    }

    return <CloseInfo biddingCloseDate={biddingCloseDate} bids={bids} />
  };

  renderAuctionBottom = () => {
    const {
      biddingOpenDate,
      biddingCloseDate,
      bids,
      status,
    } = this.props;

    // TODO move this out
    const renderBidAmount = (bidAmount/*: number*/) => {
      if (bidAmount === 'HIDDEN') {
        return `Hidden until ${biddingCloseDate.toDateString()}`;
      }
      const n = bidAmount.toFixed(5);
      return `${n} HNS`;
    };

    const bidHistorySuffix = bids.length
      ? ` (${bids.length})`
      : '';

    const body = bids.length
      ? (
        <div className="auction__history-grid">
          <div className="auction__title auction__title__history">Time placed</div>
          <div className="auction__title auction__title__history">Bidder</div>
          <div className="auction__title auction__title__history">Bid amount</div>
          {
            bids.map((bid, i) => {
              let winnerClass = '';
              if (status === 'SOLD') {
                // TODO handle for only 1 bid
                if (i === 0) {
                  winnerClass = ' auction__winner';
                }
                if (i === 1) {
                  winnerClass = ' auction__winner-price';
                }
              }

              return (
                <React.Fragment>
                  <div className={`auction__time-placed auction__history-item${winnerClass}`}>
                    { `${bid.timePlaced.toDateString()}` }
                  </div>
                  <a className={`auction__bidder auction__history-item${winnerClass}`}>
                    { bid.bidder }
                  </a>
                  <div className={`auction__history-item${winnerClass}`}>
                    {/* this can be hidden*/}
                    { renderBidAmount(bid.bidAmount) }
                  </div>
                </React.Fragment>
              );
            })
          }
        </div>
      )
      : (
        <div className="auction__bidding-open-message auction__history-item auction__hidden-message">
          {
            !!biddingOpenDate && (biddingOpenDate.getTime() > new Date().getTime())
              ? `Bidding opens on ${biddingOpenDate.toDateString()}.`
              : 'No bids!'
          }
        </div>
      );


    return (
      <div className="auction__bottom">
        <div className="auction__large">
          { `Bid History${bidHistorySuffix}`}
        </div>
        { body }
      </div>
    );
  }

  renderAuctionLeft = () => {
    const {
      status,
      bids,
      biddingCloseDate,
      biddingOpenDate,
      biddingOpenBlock,
    } = this.props;

    const isSold = status === SOLD;
    const domain = this.getDomain();
    const statusMessage = statusToMessage(status);
    const sellAmount = getSellAmount(status, bids);

    return (
      <React.Fragment>
        <div className="auction__domain">
          { `${domain}/` }
        </div>
          {
            // TODO the actual design is Visit and then an icon
            isSold && <div className="auction__visit">{`Visit ${domain}`}</div>
          }
        <div className="auction__underline" />
        <div className="auction__left">
          <div className="auction__group">
            <div className="auction__title">
              Status
            </div>
            <div className="auction__status">
              <div className="auction__status-message">
                { statusMessage }
              </div>
              {
                // TODO this function confusingly is also true if already sold
                isLimitedTimeRemaining(biddingCloseDate) && (
                  // TODO refactor these css names that got confusing and wierd through iteration
                  status !== 'SOLD' &&
                    <div
                      className="auction__limited-time__clock auction__limited auction__limited-time--small"
                    >
                      <div className="auction__clock-svg" />
                      <div className="auction__limited-time__text">limited time remaining!</div>
                    </div>
                )
              }
            </div>
            {
              sellAmount
                ? <div>{`for ${sellAmount}`}</div>
                : <a className="auction__bid-amount">{`${bids.length} bids`}</a>
            }
          </div>
          <BiddingOpen
            date={biddingOpenDate}
            block={biddingOpenBlock}
          />
          { this.renderBiddingClose() }
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="auction">
        <div className="auction__top">
          {this.renderAuctionLeft()}
          {this.renderAuctionRight()}
        </div>
        {this.renderAuctionBottom()}
      </div>
    );
  }
}
