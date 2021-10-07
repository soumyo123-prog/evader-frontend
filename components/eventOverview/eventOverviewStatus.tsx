import React, { PropsWithChildren } from 'react';
import { useAuth } from '../../context/auth';
import setInvitationStatusService from '../../services/set-invitation-status-service';

export enum InvitationStatus {
  'Pending',
  'Accepted',
  'Declined',
}

export default function EventOverviewStatus({
  status,
  dateTime,
  id,
}: PropsWithChildren<{ status: number; dateTime: string; id: number }>) {
  const currDate = new Date().getTime();
  const eventDate = new Date(dateTime).getTime();
  const disabled = currDate >= eventDate;

  const [invitationStatus, setInvitationStatus] = React.useState<string>(
    InvitationStatus[status]
  );
  const { token } = useAuth();

  const changeInvitationStatus = (inviStatus: number) => {
    if (InvitationStatus[inviStatus] === invitationStatus) {
      return;
    }
    setInvitationStatus(InvitationStatus[inviStatus]);
    setInvitationStatusService(inviStatus, token!, id);
  };

  return (
    <div className={['card m-3'].join(' ')}>
      <div className={['card-header bg-primary text-light h5'].join(' ')}>
        Status
      </div>
      <div className={['card-body', 'bg-dark text-light'].join(' ')}>
        <p className={['card-text'].join(' ')}>{invitationStatus}</p>
        <p className={['card-text'].join(' ')}>
          <strong>Change Status:</strong>
        </p>
        <button
          className={['btn btn-primary me-2'].join(' ')}
          disabled={disabled}
          onClick={() => changeInvitationStatus(0)}
        >
          Pending
        </button>
        <button
          className={['btn btn-success me-2'].join(' ')}
          disabled={disabled}
          onClick={() => changeInvitationStatus(1)}
        >
          Accepted
        </button>
        <button
          className={['btn btn-danger'].join(' ')}
          disabled={disabled}
          onClick={() => changeInvitationStatus(2)}
        >
          Declined
        </button>
      </div>
    </div>
  );
}
