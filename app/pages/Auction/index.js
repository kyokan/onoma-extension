import React, { Component } from 'react';
import './auction.scss';

const dummyState = {
  domain: 'cryptocurrency/', // would imagine this comes from react router
  status: 'AVAILABLE', // would imagine this can be calculated based on biddingOpenBlocks
  biddingOpenDate: new Date('October 19, 2018'), // is this estimated based on the openBlock?
  biddingOpenBlock: 2305,
  biddingCloseDate: new Date('October 23, 2018'),
  biddingCloseBlock: 4395,
  bids: [/*TODO 3 bids*/],
  userBid: 0,
};

// TODO
const moment = date => date;

const statusToMessage = status => ({
  AVAILABLE: 'Available',
})[status];

const isLimitedTimeRemaining = (biddingCloseDate) => {
  const TODO = true || biddingCloseDate;
  return TODO;
};

export default class Auction extends Component {
  state = dummyState

  render() {
    return (
      <div className="auction">
        <div className="auction__top">
          <div className="auction__left">
            <div className="domain">
              { this.state.domain }
            </div>
            <div>
              Status
            </div>
            <div>
              { statusToMessage(this.state.status) }
            </div>
            <div>
              {
                isLimitedTimeRemaining(this.state.biddingCloseDate)
                  ? 'limited time remaining'
                  : null
              }
            </div>
            <div>
              { `${this.state.bids.length} bids` }
            </div>
            <div>
              Bidding open
            </div>
            <div>
              { moment(this.state.biddingOpenDate) }
            </div>
            <div>
              { `block #${this.state.biddingOpenBlock}` }
            </div>
            <div>
              Bidding close
            </div>
            <div>
              { moment(this.state.biddingCloseDate) }
            </div>
            <div>
              { `block #${this.state.biddingCloseBlock}` }
            </div>
          </div>
          <div className="action__right">
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
        </div>
        <div className="action__bottom">
          <div>
            { `Bid history (${this.state.bids.length})`}
          </div>
          {/* css grid this into a table*/}
          <div>Time placed</div>
          <div>Bidder</div>
          <div>Bid amount</div>
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
      </div>
    );
  }
}
