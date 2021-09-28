import React from 'react';
import classes from './spinner.module.scss';

export default function InlineSpinner() {
  return (
    <div
      className={[
        'h-100 w-100 d-flex justify-content-center align-items-center',
      ].join(' ')}
    >
      <div className={[classes.inline_spinner].join(' ')} />
    </div>
  );
}
