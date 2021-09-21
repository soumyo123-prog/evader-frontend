/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropsWithChildren } from 'react';
import classes from './backdrop.module.scss';

export default function Backdrop({
  show,
  clickHandler,
}: PropsWithChildren<{ show: boolean; clickHandler: () => void }>) {
  let content = null;
  if (show) {
    content = (
      <div onClick={clickHandler} className={[classes.backdrop].join(' ')} />
    );
  }
  return content;
}
