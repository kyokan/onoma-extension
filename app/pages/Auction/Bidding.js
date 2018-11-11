import React from 'react';
import PropTypes from 'prop-types';

function moment(date) {
  // todo
  return date;
}

function bidding({
  date,
  block,
  type,
}) {
  return (
    <div>
      <div>
        {`Bidding ${type}`}
      </div>
      <div>
        { moment(date) }
      </div>
      <div>
        { `block #${block}` }
      </div>
    </div>
  );
}

bidding.propTypes = {
  type: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  block: PropTypes.number.isRequired,
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
  date: PropTypes.instanceOf(Date).isRequired,
  block: PropTypes.number.isRequired,
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
  date: PropTypes.instanceOf(Date).isRequired,
  block: PropTypes.number.isRequired,
};
