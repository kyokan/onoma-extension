import React, { PropTypes } from 'react';

export default function AuctionHeader({ domain }) {
  return (
    <div>,
      { domain }
    </div>
  );
}

AuctionHeader.propTypes = {
  domain: PropTypes.string.isRequired,
};
