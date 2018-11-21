import React from 'react';
import './index.scss';

export const ContentArea = ({ children, title } = props) => (
  <div className="content-area">
    <div className="content-area__title">
      {title}
    </div>
    <div className="content-area__content">
      {children}
    </div>
  </div>
);