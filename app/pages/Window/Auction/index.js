import React, { Component } from 'react';
import './auction.scss';
import { BiddingOpen, BiddingClose } from './Bidding';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const dummyStateLee = {
  domain: 'lee/',
  status: 'AVAILABLE',
  biddingOpenDate: new Date('October 19, 2019'), // is this estimated based on the openBlock?
  biddingOpenBlock: 2305,
  biddingCloseDate: new Date('October 23, 2019'),
  biddingCloseBlock: 4395,
  bids: [],
  userBid: 0,
};

export const dummyStateCryptocurrency = {
  domain: 'cryptocurrency/', // would imagine this comes from react router
  status: 'AVAILABLE', // would imagine this can be calculated based on biddingOpenBlocks
  biddingOpenDate: new Date('October 19, 2018'), // is this estimated based on the openBlock?
  biddingOpenBlock: 2305,
  biddingCloseDate: new Date('October 23, 2018'),
  biddingCloseBlock: 4395,
  bids: [
    {
      timePlaced: new Date('October 6, 2018'), // Date,
      bidder: 'you', // you or hexString,
      bidAmount: 1 // number HNS
    },
    {
      timePlaced: new Date('October 4, 2018'), // Date,
      bidder: '0x9349arbitraryhex', // you or hexString,
      bidAmount: 'HIDDEN' // number HNS
    },
    {
      timePlaced: new Date('October 5, 2018'), // Date,
      bidder: '0x342arbitraryhex', // you or hexString,
      bidAmount: 'HIDDEN', // number HNS
    },
  ],
};

export const dummyStatePony = {
  domain: 'pony/', // would imagine this comes from react router
  status: 'AVAILABLE', // would imagine this can be calculated based on biddingOpenBlocks
  biddingOpenDate: new Date('October 19, 2018'), // is this estimated based on the openBlock?
  biddingOpenBlock: 2305,
  biddingCloseDate: new Date('October 23, 2018'),
  biddingCloseBlock: 4395,
  bids: [],
  userBid: 0,
};

export const dummyStateExchange = {
  domain: 'exchange/', // would imagine this comes from react router
  status: 'SOLD', // would imagine this can be calculated based on biddingOpenBlocks
  biddingOpenDate: new Date('October 1, 2018'), // is this estimated based on the openBlock?
  biddingOpenBlock: 2305,
  biddingCloseDate: new Date('October 23, 2018'),
  biddingCloseBlock: 3209,
  bids: [
    {
      timePlaced: new Date('October 6, 2018'), // Date,
      bidder: 'you', // you or hexString,
      bidAmount: 2500.5 // number HNS
    },
    {
      timePlaced: new Date('October 3, 2018'), // Date,
      bidder: '0x9349arbitraryhex', // you or hexString,
      bidAmount: 1200 // number HNS
    },
    {
      timePlaced: new Date('October 4, 2018'), // Date,
      bidder: '0x342arbitraryhex', // you or hexString,
      bidAmount: 940, // number HNS
    },
    {
      timePlaced: new Date('October 2, 2018'), // Date,
      bidder: '0x342arbitraryhex', // you or hexString,
      bidAmount: 880, // number HNS
    },
  ],
  userBid: 0,
};

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
  const TODO = true || biddingCloseDate;
  return TODO;
};

const defaultBiddingClose = (
  <div className="auction__group">
    <div className="auction__title">Bidding close</div>
    <div className="auction__large">5 days after the 1st bid</div>
    <div className="auction__block">block #thisishardcoded</div>
    <div className="auction__small-text auction__limited-time">If no bids are placed 7 days after auction opens, this TLD will be randomly assigned a new auction open date to prevent squatting.</div>
  </div>
);

const statusToMessage = status => ({
  AVAILABLE: <div className="auction__green">Available</div>,
  SOLD: <div className="auction__red">Sold</div>,
})[status];

function getSellAmount(status, bids) {
  if (status !== 'SOLD') {
    return null;
  }
  if (bids.length === 1) {
    return '0.00000 HNS';
  }
  return `${bids[1].bidAmount} HNS`;
}

export default withRouter(class Auction extends Component {
  // TODO this should be nuked and all uses if this should be changed to normal props
  get dummyProps() {
    const domain = this.getDomain();

    const dummyStates = [
      dummyStateCryptocurrency,
      dummyStateExchange,
      dummyStateLee,
      dummyStatePony,
    ];

    const dummyProps = dummyStates.find(
      dummyState => dummyState.domain === `${domain}/`
    ) || { ...dummyStateCryptocurrency, domain };

    return {
      ...this.props,
      ...dummyProps,
    };
  }
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  };

  getDomain = () => this.props.location.pathname.split('/')[2]

  renderBiddingClose = () => (
    this.dummyProps.bids.length
      ? <BiddingClose
        date={this.dummyProps.biddingCloseDate}
        block={this.dummyProps.biddingCloseBlock}
      />
      : defaultBiddingClose
  )

  renderAuctionRight = () => {
    const openDate = this.dummyProps.biddingOpenDate

    if (this.dummyProps.status === 'SOLD') {
      return (
        <div className="auction__right">
          <div className="auction__bid-box-sold">
            <div className="auction__bidding-not-open">
              Domain sold
            </div>
            <div className="auction__title auction__col-1-to-3">Sold to</div>
            { /* TODO handle for only 1 bid*/}
            <div className="auction__set-reminder auction__col-1-to-3">{ this.dummyProps.bids.length > 1 && this.dummyProps.bids[0].bidder}</div>
            <div className="auction__title auction__col-1-to-3">Sold for</div>
            <div className="auction__large auction__col-1-to-3">{ getSellAmount(this.dummyProps.status, this.dummyProps.bids) }</div>

            {/*TODO this needs to be a different message if there is only one bid.  Also learn more needs to open a modal that doesn't currently exist.*/}
            <div className="auction__bidding-not-open auction__small-text">Winner pays the 2nd highest bid price.  Handshake uses the Vickrey Auction. Learn more</div>
          </div>
        </div>
      );
    }

    const isBiddingOpen = openDate.getTime() > new Date().getTime()

    if (isBiddingOpen) {
      return (
        <div className="auction__right">
          <div className="auction__bid-box-gray">
            <div className="auction__bidding-not-open">
              {`Bidding for this domain name opens on ${openDate.toDateString()}`}
            </div>
            <div className="auction__set-reminder">
              Set reminder
            </div>
          </div>
        </div>
      );
    }

    const closeDate = this.dummyProps.biddingCloseDate;
    return (
      <div className="auction__right">
        <div className="auction__bid-box">
          <div className="auction__title auction__col-1">
            Highest bid:
          </div>
          <div className="auction__hidden-message auction__col-1">
            {/* if should display*/}
            { `Hidden until ${closeDate.getMonth() + 1}/${closeDate.getDate()}/${closeDate.getFullYear()}` }
          </div>
          <div className="auction__align-end auction__bid-amount auction__col-2">
            { `${this.dummyProps.bids.length} bids` }
          </div>
          <div className="auction__large">
            Your bid:
          </div>
          <input className="auction__input auction__col-1"></input>
          <button className="auction__button auction__col-2">Place Bid</button>
          {/*TODO change auction__limited-time name in css*/}
          <div className="auction__limited-time auction__small-text auction__col-1-to-3">
            {'Winner pays 2nd highest bid price. If there is only one bidder, bidder gets this name for free.'}
          </div>
        </div>
      </div>
    );
  }

  renderAuctionBottom = () => {
    // TODO move this out
    const renderBidAmount = (bidAmount/*: number*/) => {
      if (bidAmount === 'HIDDEN') {
        return `Hidden until ${this.dummyProps.biddingCloseDate.toDateString()}`
      }
      const n = bidAmount.toFixed(5);
      return `${n} HNS`;
    }

    const bidHistorySuffix = this.dummyProps.bids.length
      ? ` (${this.dummyProps.bids.length})`
      : '';

    const body = this.dummyProps.bids.length
      ? (
        <div className="auction__history-grid">
          <div className="auction__title auction__title__history">Time placed</div>
          <div className="auction__title auction__title__history">Bidder</div>
          <div className="auction__title auction__title__history">Bid amount</div>
          {
            this.dummyProps.bids.map((bid, i) => {
              let winnerClass = '';
              if (this.dummyProps.status === 'SOLD') {
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
      ) : (
        <div className="auction__bidding-open-message auction__history-item auction__hidden-message">
          { this.dummyProps.biddingOpenDate.getTime() >
             new Date().getTime() ? `Bidding opens on ${this.dummyProps.biddingOpenDate.toDateString()}.` : 'No bids!'}
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
    const isSold = this.dummyProps.status === 'SOLD';
    const domain = this.getDomain();
    const statusMessage = statusToMessage(this.dummyProps.status);
    const sellAmount = getSellAmount(this.dummyProps.status, this.dummyProps.bids);
    const biddingCloseDate = this.dummyProps.biddingCloseDate;
    const bids = this.dummyProps.bids.length;

    return (
      <React.Fragment>
        <div className="auction__domain">
          { `${domain}/` }
        </div>
          {
            // TODO the actual design is Visit and then an icon
            isSold && <div className="auction__visit">{`Visit ${domain}`}</div>
          }
        <div className="auction__underline"></div>
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
                  this.dummyProps.status !== 'SOLD' &&
                    <div
                      className="auction__limited-time__clock auction__limited-time"
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
                : <a className="auction__bid-amount">{`${bids} bids`}</a>
            }
          </div>
          <BiddingOpen
            date={this.dummyProps.biddingOpenDate}
            block={this.dummyProps.biddingOpenBlock}
          />
          { this.renderBiddingClose() }
        </div>
      </React.Fragment>
    );
  }

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
});

