/* eslint-disable react/prop-types,no-use-before-define */
import React from 'react';

const AVAILABLE = 0;
const SOLD = 1;
const RESERVE = 2;

export const SoldInfo = ({ bids }) => (
  <div className="auction__right">
    <div className="auction__bid-box-sold">
      <div className="auction__bidding-not-open">
        Domain sold
      </div>
      <div className="auction__title auction__col-1-to-3">Sold to</div>
      { /* TODO handle for only 1 bid*/}
      <div className="auction__set-reminder auction__col-1-to-3">
        { bids.length > 1 && bids[0].bidder}
      </div>
      <div className="auction__title auction__col-1-to-3">Sold for</div>
      <div className="auction__large auction__col-1-to-3">
        { getSellAmount(status, bids) }
      </div>
      {/*TODO this needs to be a different message if there is only one bid.  Also learn more needs to open a modal that doesn't currently exist.*/}
      <div className="auction__bidding-not-open auction__small-text">
        Winner pays the 2nd highest bid price.  Handshake uses the Vickrey Auction. Learn more
      </div>
    </div>
  </div>
);

export const OpenInfo = ({ biddingOpenDate }) => (
  <div className="auction__right">
    <div className="auction__bid-box-gray">
      <div className="auction__bidding-not-open">
        {`Bidding for this domain name opens on ${biddingOpenDate.toDateString()}`}
      </div>
      <div className="auction__set-reminder">
        Set reminder
      </div>
    </div>
  </div>
);

export const CloseInfo = ({ biddingCloseDate, bids }) => (
  <div className="auction__right">
    <div className="auction__bid-box">
      <div className="auction__title auction__col-1">
        Highest bid:
      </div>
      <div className="auction__hidden-message auction__col-1">
        {
          biddingCloseDate
            ? `Hidden until ${biddingCloseDate.getMonth() + 1}/${biddingCloseDate.getDate()}/${biddingCloseDate.getFullYear()}`
            : ''
        }
      </div>
      <div className="auction__align-end auction__bid-amount auction__col-2 auction__bid-total">
        { `${bids.length} bids` }
      </div>
      <div className="auction__large auction__bid-label">
        Your bid:
      </div>
      <div className="auction__col-1 auction__input-container">
        <div className="auction__input">
          <input type="number" />
          <span>HNS</span>
        </div>
      </div>
      <div className="auction__btn-container">
        <button className="auction__button auction__col-2">Place Bid</button>
      </div>
      {/*TODO change auction__limited-time name in css*/}
      <div className="auction__limited-time auction__small-text auction__col-1-to-3">
        {'Winner pays 2nd highest bid price. If there is only one bidder, bidder gets this name for free.'}
      </div>
    </div>
  </div>
);

function getSellAmount(status, bids) {
  if (status !== SOLD) {
    return null;
  }
  if (bids.length === 1) {
    return '0.00000 HNS';
  }
  return `${bids[1].bidAmount} HNS`;
}
