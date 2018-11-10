import React, { PropTypes } from 'react';

const isLimitedTimeRemaining = (biddingCloseDate) => {
  const TODO = true || biddingCloseDate;
  return TODO;
};

export default function AuctionStatus({
  statusMessage,
  sellAmount,
  biddingCloseDate,
  bids,
}) {
  return (
    <div>
      <div>
        Status
      </div>
      <div>
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
  );
}

AuctionStatus.propTypes = {
  statusMessage: PropTypes.string.isRequired,
  sellAmount: PropTypes.string,
  biddingCloseDate: PropTypes.Date.isRequired,
  bids: PropTypes.number.isRequired,
};
