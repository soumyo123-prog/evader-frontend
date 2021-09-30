import React, { PropsWithChildren } from 'react';

export default function EventOverviewDescription({
  description,
}: PropsWithChildren<{ description: string }>) {
  return (
    <div className={['card m-3'].join(' ')}>
      <div className={['card-header bg-primary text-light'].join(' ')}>
        Description
      </div>
      <div
        className={[
          'card-body',
          'bg-dark text-light',
          'd-flex align-items-center',
        ].join(' ')}
      >
        <p className={['card-text'].join(' ')}>{description}</p>
      </div>
    </div>
  );
}
