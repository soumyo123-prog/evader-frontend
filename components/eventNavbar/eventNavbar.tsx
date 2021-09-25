import React from 'react';
import classes from './eventNavbar.module.scss';

export default function EventNavbar() {
  const [choosen, setChoosen] = React.useState<string>('Created');

  const navItemClickHandler = (button: string) => {
    setChoosen(button);
  };

  return (
    <ul
      className={['d-flex justify-content-center', classes.event_navbar].join(
        ' '
      )}
    >
      <li
        className={[
          'd-flex align-items-center justify-content-center',
          classes.event_navbar_item,
        ].join(' ')}
      >
        <button
          className={[
            'btn',
            `${
              choosen === 'Created'
                ? classes.event_navbar_item_active
                : 'evader-dummy'
            }`,
          ].join(' ')}
          type="button"
          onClick={() => navItemClickHandler('Created')}
        >
          Created
        </button>
      </li>
      <li
        className={[
          'd-flex align-items-center justify-content-center',
          classes.event_navbar_item,
        ].join(' ')}
      >
        <button
          className={[
            'btn',
            `${
              choosen === 'Invited'
                ? classes.event_navbar_item_active
                : 'evader-dummy'
            }`,
          ].join(' ')}
          type="button"
          onClick={() => navItemClickHandler('Invited')}
        >
          Invited
        </button>
      </li>
    </ul>
  );
}
