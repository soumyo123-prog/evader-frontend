import React, { PropsWithChildren } from 'react';
import classes from './eventOverview.module.scss';

export default function EventOverviewDescription({
  description,
}: PropsWithChildren<{ description: string }>) {
  return (
    <div className={['card m-3 shadow', classes.min_width].join(' ')}>
      <div className={['card-header h5'].join(' ')}>Description</div>
      <div className={['card-body'].join(' ')}>
        <p className={['card-text'].join(' ')}>{description}</p>
      </div>
    </div>
  );
}
