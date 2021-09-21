import React, { PropsWithChildren } from 'react';
import classes from './main-content-wrapper.module.scss';

export default function MainContentWrapper({
  children,
}: PropsWithChildren<{}>) {
  return (
    <div className={[classes.main_content_wrapper].join(' ')}> {children} </div>
  );
}
