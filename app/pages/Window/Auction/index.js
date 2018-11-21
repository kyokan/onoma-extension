import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as domainActions from '../../../ducks/domains';
import { BiddingOpen, BiddingClose } from './Bidding';
import { CloseInfo, OpenInfo, SoldInfo } from './info';
import './auction.scss';
import { AUCTION_STATE } from '../../../ducks/domains';

const AVAILABLE = 0;
const SOLD = 1;
const RESERVE = 2;

const LAUNCH_DATE = new Date('October 1, 2018');

function addDays(start = new Date(), days = 0) {
  return new Date(start.getTime() + (days * 24 * 60 * 60 * 1000));
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

  return isEarlierThan(biddingCloseDate, addDays(new Date(), 7));
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

function getStatus(domain = {}, bids = []) {
  const closeDate = getCloseDate(domain, bids);

  return SOLD
  if (domain.start && domain.start.reserved) {
    return RESERVE;
  }

  if (domain.info && domain.info.owner) {
    return SOLD;
  }

  if (closeDate && isEarlierThan(closeDate, new Date())) {
    // TODO: Is there a state for when a TLD has past 7 days without bids?
  }

  return AVAILABLE;
}

function getCloseDate(domain = {}, bids = []) {
  if (!domain.start) {
    return null;
  }

  if (domain.info && domain.info.owner) {
    return bids[0] && bids[0].timePlaced;
  }

  if (bids.length === 0) {
    return addDays(LAUNCH_DATE, (domain.start.week * 7) + 7);
  } else {
    return addDays(bids[0].timePlaced, 5);
  }
}

@withRouter
@connect(
  (state, ownProps) => {
    const domain = state.domains[ownProps.match.params.name] || {};
    const bids = [
      {
        timePlaced: new Date('October 6, 2018'), // Date,
        bidder: 'you', // you or hexString,
        bidAmount: 2500.5 // number HNS
      },
    ];

    return {
      status: getStatus(domain),
      bids,
      biddingOpenDate: domain.start ? addDays(LAUNCH_DATE, domain.start.week * 7) : null,
      biddingOpenWeek: domain.start ? domain.start.week : null,
      biddingOpenBlock: domain.start && domain.start.start,
      biddingCloseDate: getCloseDate(domain, bids),
      biddingCloseBlock: null,
      paidValue: 1000000000 || domain.info && domain.info.value,
      owner: 'ts1qg9v8g9ccht2nvslkxd0h2aujcvglfxnjme8x6s' || domain.info && domain.info.owner,
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
    status: PropTypes.oneOf([AVAILABLE, SOLD, RESERVE]),
    biddingCloseBlock: PropTypes.number,
    biddingOpenBlock: PropTypes.number,
    paidValue: PropTypes.number,
    owner: PropTypes.string,
    biddingCloseDate: PropTypes.instanceOf(Date),
    biddingOpenDate: PropTypes.instanceOf(Date),
    biddingOpenWeek: PropTypes.number,
  };

  componentWillMount() {
    this.props.getNameInfo(this.getDomain());
  }

  getDomain = () => this.props.match.params.name;

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
      paidValue,
      owner,
    }= this.props;

    if (status === SOLD) {
      return <SoldInfo owner={owner} paidValue={paidValue} />;
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
        <div className="auction__bid-history__title">
          { `Bid History${bidHistorySuffix}`}
        </div>
        { body }
      </div>
    );
  };

  renderAuctionLeft = () => {
    const {
      status,
      bids,
      biddingCloseDate,
      biddingOpenDate,
      biddingOpenWeek,
      biddingOpenBlock,
      paidValue,
    } = this.props;

    const isSold = status === SOLD;
    const domain = this.getDomain();
    const statusMessage = statusToMessage(status);

    return (
      <React.Fragment>
        <div className="auction__domain">
          { `${domain}/` }
        </div>
        {
          isSold && (
            <div className="auction__visit" onClick={() => window.open(`http://.${domain}`, '_blank')}>
              <span>Visit</span>
              <span className="auction__visit-icon" />
            </div>
          )
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
                isLimitedTimeRemaining(biddingCloseDate) && !isSold
                  ? (
                    // TODO refactor these css names that got confusing and wierd through iteration
                    <div
                      className="auction__limited-time__clock auction__limited auction__limited-time--small"
                    >
                      <div className="auction__clock-svg" />
                      <div className="auction__limited-time__text">limited time remaining!</div>
                    </div>
                  )
                  : null
              }
            </div>
            {
              paidValue && isSold
                ? <div className="auction__paid-bid">{`${paidValue} HNS`}</div>
                : <a className="auction__bid-open-week">{`Week ${biddingOpenWeek}`}</a>
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
