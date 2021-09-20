/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { useSidebar } from '../../context/sidebar';
import classes from './sidebar.module.scss';
import { useAuth } from '../../context/auth';

export default function Sidebar() {
  const { expand, active, setActive } = useSidebar();
  const { signOutHandler } = useAuth();

  const sidebarContainerClasses = [classes.sidebar_container];
  if (expand) {
    sidebarContainerClasses.push(classes.sidebar_expand);
  } else {
    sidebarContainerClasses.push(classes.sidebar_collapse);
  }

  return (
    <div className={sidebarContainerClasses.join(' ')}>
      <ul
        className={[
          'd-flex flex-column align-items-center',
          'list-group',
          classes.sidebar_list,
        ].join(' ')}
      >
        <li
          className={[
            'list-group-item',
            'd-flex justify-content-center align-items-center',
            classes.sidebar_list_item,
          ].join(' ')}
        >
          <Link href="/">
            <a
              className={[
                'd-flex align-items-center',
                classes.sidebar_link,
                `${active === 'home' ? classes.sidebar_link_active : null}`,
              ].join(' ')}
              onClick={() => setActive('home')}
            >
              <div
                className={[
                  'd-flex justify-content-center align-items-center',
                ].join(' ')}
                style={{ height: '50px', width: '80px' }}
              >
                <FaHome size="1.5rem" />{' '}
              </div>
              {expand ? 'Home' : ''}
            </a>
          </Link>
        </li>
        <li
          className={[
            'list-group-item',
            'd-flex justify-content-center align-items-center',
            classes.sidebar_list_item,
          ].join(' ')}
        >
          <Link href="/">
            <a
              className={[
                'd-flex align-items-center',
                classes.sidebar_link,
                `${active === 'events' ? classes.sidebar_link_active : null}`,
              ].join(' ')}
              onClick={() => setActive('events')}
            >
              <div
                className={[
                  'd-flex justify-content-center align-items-center',
                ].join(' ')}
                style={{ height: '50px', width: '80px' }}
              >
                <MdEventNote size="1.5rem" />
              </div>
              {expand ? 'Events' : ''}
            </a>
          </Link>
        </li>
        <li
          className={[
            'list-group-item',
            'd-flex justify-content-center align-items-center',
            classes.sidebar_list_item,
          ].join(' ')}
        >
          <Link href="/">
            <a
              className={[
                'd-flex align-items-center',
                classes.sidebar_link,
                `${active === 'profile' ? classes.sidebar_link_active : null}`,
              ].join(' ')}
              onClick={() => setActive('profile')}
            >
              <div
                className={[
                  'd-flex justify-content-center align-items-center',
                ].join(' ')}
                style={{ height: '50px', width: '80px' }}
              >
                <IoPerson size="1.5rem" />
              </div>
              {expand ? 'Profile' : ''}
            </a>
          </Link>
        </li>
        <li
          className={[
            'list-group-item',
            'd-flex justify-content-center align-items-center',
            classes.sidebar_list_item,
          ].join(' ')}
        >
          <Link href="/">
            <a
              className={[
                'd-flex align-items-center',
                classes.sidebar_link,
                `${active === 'settings' ? classes.sidebar_link_active : null}`,
              ].join(' ')}
              onClick={() => setActive('settings')}
            >
              <div
                className={[
                  'd-flex justify-content-center align-items-center',
                ].join(' ')}
                style={{ height: '50px', width: '80px' }}
              >
                <IoIosSettings size="1.5rem" />
              </div>
              {expand ? 'Settings' : ''}
            </a>
          </Link>
        </li>
        <li
          className={[
            'list-group-item',
            'd-flex justify-content-center align-items-center',
            classes.sidebar_list_item,
          ].join(' ')}
        >
          <button
            className={[
              'd-flex align-items-center',
              classes.sidebar_link,
              classes.logout_button,
            ].join(' ')}
            type="button"
            onClick={signOutHandler}
          >
            <div
              className={[
                'd-flex justify-content-center align-items-center',
              ].join(' ')}
              style={{ height: '50px', width: '80px' }}
            >
              <BiLogOut size="1.5rem" />
            </div>
            {expand ? 'Logout' : ''}
          </button>
        </li>
      </ul>
    </div>
  );
}
