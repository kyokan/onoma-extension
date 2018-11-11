import React, { PropTypes } from 'react';

export default function AuctionHeader({ domain, isSold }) {
  return (
    <React.Fragment>
      <div>,
        { domain }
      </div>
      {
        isSold && <div>`Visit link would go here ${domain}`</div>
      }
    </React.Fragment>
  );
}

AuctionHeader.propTypes = {
  domain: PropTypes.string.isRequired,
  isSold: PropTypes.boolean.isRequired,
};
