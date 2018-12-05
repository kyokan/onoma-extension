import React from 'react';
import c from 'classnames';

export default function ExtensionWrapper(props) {
  const names = c(
    'extension_primary_section',
    props.className,
    {
      ['extension_primary_section--in-window']: props.inWindow
    },
  );

  return (
    <div className={names}>
      {props.children}
    </div>
  );
}