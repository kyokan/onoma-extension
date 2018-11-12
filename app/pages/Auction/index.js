import React, { Component } from 'react';
import './auction.scss';
import { BiddingOpen, BiddingClose } from './Bidding';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const dummyStateLee = {
  domain: 'cryptocurrency/',
  status: 'AVAILABLE',
  biddingOpenDate: new Date('October 19, 2018'), // is this estimated based on the openBlock?
  biddingOpenBlock: 2305,
  biddingCloseDate: 0, // 5 days after the 1st bid
  biddingCloseBlock: 0, // n blocks after the first bid?
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
  bids: [/*TODO 3 bids*/],
  userBid: 0,
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
  biddingOpenDate: new Date('October 19, 2018'), // is this estimated based on the openBlock?
  biddingOpenBlock: 2305,
  biddingCloseDate: new Date('October 23, 2018'),
  biddingCloseBlock: 3209,
  bids: [/*TODO 7 bids with a winner.  The price he pays is the 2nd bid or 0*/],
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
  <React.Fragment>
    <div>5 days after the 1st bid</div>
    <div>If no bids are placed 7 days after auction opens, this TLD will be randomly assigned a new auction open date to prevent squatting.</div>
  </React.Fragment>
);

// TODO
const moment = date => date;

const statusToMessage = status => ({
  AVAILABLE: 'Available',
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
  constructor(props) {
    super(props);

    const domain = this.getDomain();

    const dummyStates = [
      dummyStateCryptocurrency,
      dummyStateExchange,
      dummyStateLee,
      dummyStatePony,
    ];

    // TODO get this from actual place
    this.state = dummyStates.find(
      dummyState => dummyState.domain === domain
    ) || { ...dummyStateCryptocurrency, domain };
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
    this.state.bids.length
      ? <BiddingClose
        date={this.state.biddingCloseDate}
        block={this.state.biddingCloseBlock}
      />
      : defaultBiddingClose
  )

  renderAuctionRight = () => {
    return (
      <div className="auction__right">
        <div>
          Highest bid:
        </div>
        <div>
          {/* if should display*/}
          { `Hidden until ${moment(this.state.biddingCloseDate)}` }
        </div>
        <div>
          { `${this.state.bids.length} bids` }
        </div>
        <div>
          Your bid:
        </div>
        <div>
          this is actually an input where you can place a bid
        </div>
        <div>
          {'Winner pays 2nd highest bid price. If there is only one bidder, bidder gets this name for free.'}
        </div>
      </div>
    );
  }

  renderAuctionBottom = () => {
    return (
      <div className="auction__bottom">
        <div className="auction__history__title">
          { `Bid history (${this.state.bids.length})`}
        </div>
        {/* css grid this into a table*/}
        <div className="auction__title">Time placed</div>
        <div className="auction__title">Bidder</div>
        <div className="auction__title">Bid amount</div>
        {
          this.state.bids.map(bid => (
            <React.Fragment>
              <div>
                { moment(bid.timePlaced) }
              </div>
              <div>
                { bid.bidder }
              </div>
              <div>
                {/* this can be hidden*/}
                { bid.bidAmount }
              </div>
            </React.Fragment>
          ))
        }
      </div>
    );
  }

  renderAuctionLeft = () => {
    const isSold = this.state.status === 'SOLD';
    const domain = this.getDomain();
    const statusMessage = statusToMessage(this.state.status);
    const sellAmount = getSellAmount(this.state.status, this.state.bids);
    const biddingCloseDate = this.state.biddingCloseDate;
    const bids = this.state.bids.length;

    return (
      <React.Fragment>
        <div className="auction__domain">
          { `${domain}/` }
        </div>
        <div className="auction__left">
          {
            isSold && <div>`Visit link would go here ${domain}`</div>
          }
          <div className="auction__group">
            <div className="auction__title">
              Status
            </div>
            <div className="auction_status">
              { statusMessage }
            </div>
            <div>
              {
                isLimitedTimeRemaining(biddingCloseDate)
                  ? 'limited time remaining'
                  : null
              }
            </div>
            {
              sellAmount
                ? <div>`for ${sellAmount}`</div>
                : <div>`${bids} bids`</div>
            }
          </div>
          <BiddingOpen
            date={this.state.biddingOpenDate}
            block={this.state.biddingOpenBlock}
          />
          { this.renderBiddingClose() }
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="auction">
        {this.renderAuctionLeft()}
        {this.renderAuctionRight()}
        {this.renderAuctionBottom()}
      </div>
    );
  }
});

