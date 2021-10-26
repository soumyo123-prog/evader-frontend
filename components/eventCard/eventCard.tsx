import React, { PropsWithChildren } from 'react';

import moment from 'moment';
import { HiLocationMarker } from 'react-icons/hi';
import { IoTimeSharp } from 'react-icons/io5';
import { BsCalendarFill } from 'react-icons/bs';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { toast, ToastContainer } from 'react-toastify';

import { EventType } from '../../types/types';
import { useEventAvatarFetcherService } from '../../services/event-avatar-fetcher-service';
import EventDeleterService from '../../services/event-deleter-service';
import EventEmitterService from '../../services/event-emitter-service';
import { useAuth } from '../../context/auth';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

export default function EventCard({
  id,
  name,
  description,
  venue,
  time,
  fireId,
  invitedBy,
}: PropsWithChildren<EventType>) {
  const { token } = useAuth();
  const url = useEventAvatarFetcherService(fireId);

  const deleteClickHandler: React.ChangeEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    EventDeleterService(id, token!)
      .then(() => {
        EventEmitterService('event_deleted', { id });
      })
      .catch(() => {
        toast.error('Something went wrong !');
      });
  };

  return (
    <>
      <styles.CardContainer>
        {!invitedBy && (
          <styles.Delete outline color="danger" onClick={deleteClickHandler}>
            <RiDeleteBin6Fill size="1.5rem" />
          </styles.Delete>
        )}
        <styles.ImageContainer>
          <styles.CardImage
            src={
              url || `https://avatars.dicebear.com/api/jdenticon/${fireId}.svg`
            }
            alt=""
          />
        </styles.ImageContainer>
        <styles.CardDetails>
          <styles.Title>{name}</styles.Title>
          <styles.Description>{description}</styles.Description>
          <styles.Venue>
            <HiLocationMarker size="1.5rem" /> {venue}
          </styles.Venue>
          <styles.DateTime>
            <BsCalendarFill />
            {moment(time).format('dddd, MMM Do, YYYY')}
          </styles.DateTime>
          <styles.DateTime>
            <IoTimeSharp size="1.5rem" />
            {moment(time).format('h:mm A')}
          </styles.DateTime>
        </styles.CardDetails>
      </styles.CardContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
