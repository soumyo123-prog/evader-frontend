import React from 'react';
import { useAuth } from '../context/auth';
import axios from '../context/axios';
import { EventType } from '../types/types';

export default function useEventFetcher(id: string) {
  const [event, setEvent] = React.useState<EventType>({} as EventType);
  const { token } = useAuth();

  React.useEffect(() => {
    let isMounted = true;
    axios
      .get<EventType>(`event/fetch/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        if (isMounted) {
          setEvent(res.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return event;
}
