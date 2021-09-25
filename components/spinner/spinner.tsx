import React, { PropsWithChildren } from 'react';
import classes from './spinner.module.scss';

export default function Spinner({ text }: PropsWithChildren<{ text: string }>) {
  return (
    <div
      className={[
        'h-100 w-100',
        'd-flex flex-column  justify-content-center align-items-center',
        classes.spinner_container,
      ].join(' ')}
    >
      <div className={[classes.project_name].join(' ')}>Evader</div>
      <div className={[classes.spinner].join(' ')} />
      <div className={[classes.spinner_text].join(' ')}>{text}</div>
    </div>
  );
}
