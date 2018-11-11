import React from 'react';
import PropTypes from 'prop-types';

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
  isSold: PropTypes.bool.isRequired,
};
