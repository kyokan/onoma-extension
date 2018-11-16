import React from 'react';
import PropTypes from 'prop-types';

function bidding({
  date,
  block,
  type,
}) {
  return (
    <div className="auction__group">
      <div className="auction__title">
        {`Bidding ${type}`}
      </div>
      <div className="auction__large">
        { date ? date.toDateString() : '' }
      </div>
      <div className="auction__block">
        { block ? `Block #${block}` : '' }
      </div>
    </div>
  );
}

bidding.propTypes = {
  type: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  block: PropTypes.number,
};

export function BiddingOpen({
  date,
  block,
}) {
  return bidding({
    date,
    block,
    type: 'open',
  });
}

BiddingOpen.propTypes = {
  date: PropTypes.instanceOf(Date),
  block: PropTypes.number,
};

export function BiddingClose({
  date,
  block,
}) {
  return bidding({
    date,
    block,
    type: 'close',
  });
}

BiddingClose.propTypes = {
  date: PropTypes.instanceOf(Date),
  block: PropTypes.number,
};
