import React from 'react';
import axios from '../context/axios';
import { EventType } from '../types/types';

export default function useEventsFetcher(token: string) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<EventType[]>([]);

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
    }
    axios
      .get<EventType[]>('event/fetch/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          setEvents(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { events, loading };
}
