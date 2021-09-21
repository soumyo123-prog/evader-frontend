import React from 'react';
import classes from './spinner.module.scss';

export default function Spinner() {
  return (
    <div
      className={[
        'h-100 w-100',
        'd-flex flex-column  justify-content-center align-items-center',
      ].join(' ')}
    >
      <div className={[classes.project_name].join(' ')}>Evader</div>
      <div className={[classes.spinner].join(' ')} />
    </div>
  );
}
