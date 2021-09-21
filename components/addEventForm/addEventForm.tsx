/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PropsWithChildren } from 'react';
import classes from './addEventForm.module.scss';

export default function AddEventForm({
  show,
}: PropsWithChildren<{ show: boolean }>) {
  let content = null;
  if (show) {
    content = (
      <form
        className={[
          'd-flex flex-column align-items-center justify-content-center',
          classes.add_event_form,
        ].join(' ')}
      >
        <h1 className={['display-6'].join(' ')}> Add Event </h1>
        <div className="mb-3">
          <label htmlFor="name" className={['form-label'].join(' ')}>
            Name
          </label>
          <input type="text" className={['form-control'].join(' ')} id="name" />
        </div>
        <button className={['btn btn-success'].join(' ')} type="submit">
          Create
        </button>
      </form>
    );
  }

  return content;
}
